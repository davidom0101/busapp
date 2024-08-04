import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import {
  MenuIcon,
  TicketsIcon,
  TrackIcon,
  ProfileIcon,
  FAQIcon,
  MyTicketsIcon,
  TimetablesIcon,
  BusIcon,
  ContactIcon,
} from "../components/Icons";
import ContinuouslyScrollingText from "../components/ContinuouslyScrollingText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalStateStore } from "../components/globalStateStore"; 

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const itemWidth = windowWidth / 2 - 20;
const itemHeight =
  (windowHeight - windowWidth * 0.4 - Constants.statusBarHeight) / 3 - 40;

const HomeScreen = ({ navigation }) => {
  const [notice, setNotice] = useState("");
  const unSeenNotifications = useGlobalStateStore((s) => s.unSeenNotifications);
  
  useEffect(() => {
    fetch("https://burkesbus.ie/wp-json/wp/v2/app_notice/2242")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.content) {
          // check if data and content exists
          const regex = /<p>(.*)<\/p>/; // regex to match the <p> tags and capture the content in between
          const notice = data.content.rendered.replace(regex, "$1"); // replace the matched string with the captured content
          setNotice(notice);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Commenting out the ContinuouslyScrollingText component to remove it from the UI */}
      {/* 
        <ContinuouslyScrollingText
            notice={notice}
        />
        */}

      <View style={styles.header}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <MenuIcon />
        </TouchableOpacity>
        <Image
          style={styles.headerLogo}
          source={require("./../assets/BB-Logo.png")}
        />
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Ionicons name="notifications" size={30} color="black" />
          <Text
            style={{
              fontFamily: "ABeeZeeRegular",
              position: "absolute",
              top: -10,
              right: -4,
              backgroundColor: "red",
              color: "#fff",
              paddingHorizontal:5,
              paddingVertical:2,
              borderRadius:30,
              fontSize:8
            }}
          >
            {unSeenNotifications}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, position: "relative", zIndex: 20 }}>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              navigation.push("Timetable");
            }}
          >
            <TimetablesIcon />
            <Text style={styles.navItemText}>Timetables</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              navigation.push("Detail", {
                title: "Fares",
                url: "https://corkconnect.ie/app-fares",
              });
            }}
          >
            <TicketsIcon />
            <Text style={styles.navItemText}>Fares</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              navigation.push("Detail", {
                title: "Track My Bus",
                url: "https://leap.futurefleet.com/track-journey/?provider=Q0JPQkNM&lang=en",
              });
            }}
          >
            <TrackIcon />
            <Text style={styles.navItemText}>Track My Bus</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              navigation.push("Detail", {
                title: "News",
                url: "https://corkconnect.ie/app-news/",
              });
            }}
          >
            <FAQIcon />
            <Text style={styles.navItemText}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              navigation.push("Detail", {
                title: "Coach Hire",
                url: "https://corkconnect.ie/app-coach-hire-form/",
              });
            }}
          >
            <BusIcon />
            <Text style={styles.navItemText}>Coach Hire</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              navigation.push("Detail", {
                title: "Contact Us",
                url: "https://corkconnect.ie/app-contact-us/",
              });
            }}
          >
            <ContactIcon />
            <Text style={styles.navItemText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        style={styles.footer}
        source={require("./../assets/footer-bg.png")}
      />
      <Image style={styles.bg01} source={require("./../assets/bg01.png")} />
      <Image style={styles.bg02} source={require("./../assets/bg02.png")} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ed2a2b",
    position: "relative",
  },
  header: {
    backgroundColor: "#ffffff",
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 12,
    marginHorizontal: 16,
    position: "relative",
  },
  headerLogo: {
    width: 224,
    height: 44,
    resizeMode: "contain",
  },
  menuBtn: {
    position: "absolute",
    left: 18,
  },
  body: {
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  navItem: {
    width: itemWidth,
    height: itemHeight,
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: "rgba(237,42,43,.6)",
    borderRadius: 10,
    borderColor: "rgba(255,255,255,.96)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 20,
  },
  navItemText: {
    fontFamily: "ABeeZeeRegular",
    fontSize: 18,
    color: "#ffffff",
    marginTop: 20,
  },
  footer: {
    marginTop: 8,
    width: windowWidth,
    height: windowWidth * 0.4,
    resizeMode: "contain",
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 11,
  },
  bg01: {
    width: 65,
    height: 108,
    resizeMode: "contain",
    position: "absolute",
    top: Constants.statusBarHeight + 86,
    left: 0,
    zIndex: 10,
  },
  bg02: {
    width: 52,
    height: 125,
    resizeMode: "contain",
    position: "absolute",
    bottom: windowWidth * 0.4 - 50,
    right: 0,
    zIndex: 10,
  },
});
