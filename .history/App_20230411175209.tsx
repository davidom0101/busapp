import React, { useEffect } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import VersionCheck from "react-native-version-check-expo";
export default function App() {
  useEffect(() => {
    console.log(VersionCheck.getPackageName()); // com.reactnative.app
    console.log(VersionCheck.getCurrentBuildNumber()); // 10
    console.log(VersionCheck.getCurrentVersion());
    VersionCheck.getLatestVersion().then((latestVersion) => {
      console.log(latestVersion); // 0.1.2
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
