import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import VersionCheck from "react-native-version-check-expo";
export default function App() {
  const [isNeedsToBeUpdated, setIsNeedsToBeUpdated] = useState(false);
  useEffect(() => {
    const currentVersion = 1//VersionCheck.getCurrentVersion();

    VersionCheck.getLatestVersion().then((latestVersion) => {
      console.log(latestVersion); // 0.1.2
      if (latestVersion != currentVersion) {
        alert("1");
      }
    });
  }, []);

  const [loaded] = useFonts({
    ABeeZeeRegular: require("./assets/fonts/ABeeZee-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <MainNavigator />;
}
