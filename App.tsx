import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { useGlobalStateStore } from "./components/globalStateStore";
import { notificationStatusKey } from "./components/constants";
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
  console.log("time :", new Date().toDateString());
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setPushNotifcationToken(token as string);
      const res = await AsyncStorage.getItem(notificationStatusKey);
      if (res === "no") {
      } else if (token) {
        console.log("notification allowed :", res);
        addTokentoFirebase(token as string);
      }
    });
  }, []);

  if (!loaded) {
    return null;
  }
  return <MainNavigator />;
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
