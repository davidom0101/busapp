import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";
import {
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
    if (data?.notification?.data.title) {
      await handleNotificationAsyncStore({
        title: data?.notification?.data.title,
        body: data?.notification?.data.message,
        status: "unseen",
        id:uuidv4()
      });
    }
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
  const responseListener = useRef<Notifications.Subscription>();
  const onReceiveNotification = async () => {
    const unseenCount = await getUnseenCount();
    setunSeenNotifications(unseenCount);
  };
  const checkNotificationsEnabled = async () => {
    try {
      const res = await AsyncStorage.getItem(notificationStatusKey);
      console.log("notifications status stored :", res);
      if (res === "no") {
        return;
      }
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
          console.log("Token sent to backend successfully:", data);
          storeData(notificationStatusKey, "yes");
        })
        .catch((error) => {
          console.error(
            "Error sending token to backend:",
            error,
            pushNotificationToken
          );
        });
    } catch (error) {
      console.log("error checking notification status :", error);
    }
  };
  useEffect(() => {
    onReceiveNotification();
  }, [notification]);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setPushNotifcationToken(token as string);
      checkNotificationsEnabled();
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        setNotification(notification);
        console.log(notification);
        onReceiveNotification();
        await handleNotificationAsyncStore({
          title: notification.request.content.title,
          body: notification.request.content.body,
          status: "unseen",
          id:uuidv4()
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          await handleNotificationAsyncStore({
            title: response.notification.request.content.title,
            body: response.notification.request.content.body,
            status: "unseen",
            id:uuidv4()
          });
          onReceiveNotification();
        }
      );
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
