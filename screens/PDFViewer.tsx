import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  PermissionsAndroid,
  Platform,
  Button,
} from "react-native";
//import Pdf from "react-native-pdf";
import Constants from "expo-constants";
import { BackIcon } from "../components/Icons";
import WebView from "react-native-webview";
import { useEffect } from "react";

export default function PDFViewer() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const source = {
    uri: route?.params?.uri,
    cache: true,
  };
  async function requestStoragePermission() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to read files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the storage");
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }
  useEffect(() => {
    requestStoragePermission();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.titleText}>Timetable</Text>
      </View>
      {/* <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{ flex: 1, width, height }}
      /> */}
      <WebView
        originWhitelist={["*"]}
        source={{
          uri:source.uri,
        }}
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
      />
      <Button  title="Open" onPress={requestStoragePermission} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ed2a2b",
    height: 56 + Constants.statusBarHeight,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    fontFamily: "ABeeZeeRegular",
    fontSize: 23,
    color: "#ffffff",
    fontWeight: "bold",
  },
  backBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
//Plugins
// "@config-plugins/react-native-blob-util",
// "@config-plugins/react-native-pdf"
//dependencies
// "react-native-pdf": "^6.7.5",
// "expo-dev-client": "~4.0.20",
//    "@config-plugins/react-native-blob-util": "^8.0.0",
// "@config-plugins/react-native-pdf": "^8.0.0",
//    "react-native-blob-util": "^0.19.11",
