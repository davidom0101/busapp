import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { MainNavigator } from "./navigation/mainNavigator";
import VersionCheck from "react-native-version-check-expo";
import UpdateModal from "./components/UpdateModel";
export default function App() {
  const [isNeedsToBeUpdated, setIsNeedsToBeUpdated] = useState(false);
  useEffect(() => {
    const currentVersion = 1; //VersionCheck.getCurrentVersion();

    VersionCheck.getLatestVersion().then((latestVersion) => {
      console.log(latestVersion); // 0.1.2
      if (latestVersion != currentVersion) {
        setIsNeedsToBeUpdated(true);
      }
    });
  }, []);

  const [loaded] = useFonts({
    ABeeZeeRegular: require("./assets/fonts/ABeeZee-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <View>{<UpdateModal visible={isNeedsToBeUpdated} />}</View>;
}
