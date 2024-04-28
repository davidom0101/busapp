import React, { useEffect } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import VersionCheck from "react-native-version-check-expo";
export default function App() {
  useEffect(() => {
    VersionCheck.getCountry().then((country) => console.log(country)); // KR
    console.log(VersionCheck.getPackageName()); // com.reactnative.app
    console.log(VersionCheck.getCurrentBuildNumber()); // 10
    console.log(VersionCheck.getCurrentVersion());
  }, []);

  const [loaded] = useFonts({
    ABeeZeeRegular: require("./assets/fonts/ABeeZee-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <MainNavigator />;
}
