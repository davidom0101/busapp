import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";
import {
  getNotifications,
  getUnseenCount,
  handleNotificationAsyncStore,
  storeData,
} from "./components/helperFunctions";
import { useGlobalStateStore } from "./components/globalStateStore";
import { notificationStatusKey } from "./components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error, executionInfo }) => {
    console.log(
      "Received a notification in the background!",
      data,
      executionInfo
    );
    await handleNotificationAsyncStore({
      title: data.notification.data.title,
      body: data.notification.data.message,
      status: "unseen",
    });
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [loaded] = useFonts({
    ABeeZeeRegular: require("./assets/fonts/ABeeZee-Regular.ttf"),
  });
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const setunSeenNotifications = useGlobalStateStore(
    (s) => s.setunSeenNotifications
  );
  const setPushNotifcationToken = useGlobalStateStore(
    (s) => s.setPushNotifcationToken
  );
  const pushNotificationToken = useGlobalStateStore(
    (s) => s.pushNotificationToken
  );
  const setNotificationsEnabled = useGlobalStateStore(
    (s) => s.setNotificationsEnabled
  );
  const notificationsEnabled = useGlobalStateStore(
    (s) => s.notificationsEnabled
  );
  const responseListener = useRef<Notifications.Subscription>();
  const onReceiveNotification = async () => {
    const notifications = await getNotifications();
    const unseenCount = await getUnseenCount();
    setunSeenNotifications(unseenCount);
    console.log("All notifications:", notifications);
    console.log("Unseen notifications count:", unseenCount);
  };
  const checkNotificationsEnabled = async () => {
    try {
      const res = await AsyncStorage.getItem(notificationStatusKey);
      console.log("notifications status stored :", res);
      if (res === "no") {
        setNotificationsEnabled(false);
      } else {
        const url = "https://corkconnect.ie?lceps_key=66882392342f5&add_token=";
        fetch(`${url}${encodeURIComponent(pushNotificationToken as string)}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Server error: ${response.status} ${response.statusText}`
              );
            }
            return response.text();
          })
          .then((data) => {
            console.log(
              "Token sent to backend successfully:",
              data,
              notificationsEnabled
            );
            storeData(notificationStatusKey, "yes");
          })
          .catch((error) => {
            console.error("Error sending token to backend:", error);
          });
      }
    } catch (error) {
      console.log("error checking notification status :", error);
    }
  };
  useEffect(() => {
    onReceiveNotification();
  }, [notification]);
  console.log("notifications enabled :", notificationsEnabled);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setPushNotifcationToken(token as string);
      checkNotificationsEnabled();
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        setNotification(notification);
        // console.log("notification :", notification);
        await handleNotificationAsyncStore({
          title: notification.request.content.title,
          body: notification.request.content.body,
          status: "unseen",
        });
        // Alert.alert(
        //   notification.request.content.title as string,
        //   notification.request.content.body as string
        // );
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response recieve lisnet", response);
      });
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <MainNavigator />
    </View>
  );
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
