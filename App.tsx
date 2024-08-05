import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { storeData } from "./components/helperFunctions";
import { useGlobalStateStore } from "./components/globalStateStore";
import {
  enablePushNotificationsUrl,
  notificationStatusKey,
} from "./components/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error, executionInfo }) => {
    console.log(
      "Received a notification in the background!",
      data,
      executionInfo
    );
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

  const setPushNotifcationToken = useGlobalStateStore(
    (s) => s.setPushNotifcationToken
  );

  const currentDate = new Date();
  const addTokentoFirebase = async (pushToken: string) => {
    try {
      await setDoc(doc(db, "pushTokens", pushToken), {
        expoPushToken: pushToken,
        TimeStamp: currentDate,
      })
        .then((x) => console.log("Token Add succesfully"))
        .catch((error) => console.log(error));
      console.log("push token >> ", pushToken);
    } catch (e) {
      console.log("error while adding document", e);
    }
  };
  const checkNotificationsEnabled = async (token) => {
    try {
      const res = await AsyncStorage.getItem(notificationStatusKey);
      console.log("notifications status stored :", res);
      if (res === "no") {
        return;
      }
      fetch(
        `${enablePushNotificationsUrl}${encodeURIComponent(token as string)}`
      )
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
          console.error("Error sending token to backend:", error, token);
        });
    } catch (error) {
      console.log("error checking notification status :", error);
    }
  };
  console.log("time :", new Date().toDateString());
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setPushNotifcationToken(token as string);
      checkNotificationsEnabled(token);
      addTokentoFirebase(token);
    });
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
      const projectId = "27a7b130-a0ae-4a45-a4cf-5ab6d7c90751";
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
