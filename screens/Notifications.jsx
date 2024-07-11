import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  UIManager,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { BackIcon } from "../components/Icons"; // Ensure the import path is correct.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalStateStore } from "../components/globalStateStore";
import {
  disbalePushNotifcationsUrl,
  enablePushNotificationsUrl,
  notificationStatusKey,
} from "../components/constants";
import {
  clearAllNotifications,
  getUnseenCount,
  markNotificationAsSeenAsyncStore,
  storeData,
} from "../components/helperFunctions";
import { useNavigation } from "@react-navigation/native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const pushNotificationToken = useGlobalStateStore(
    (s) => s.pushNotificationToken
  );
  const [notificationsStatus, setNotificationsStatus] = useState(null);
  const setunSeenNotifications = useGlobalStateStore(
    (s) => s.setunSeenNotifications
  );
  const checkNotificationsStatus = async () => {
    try {
      const res = await AsyncStorage.getItem(notificationStatusKey);
      if (res === "no") {
        setNotificationsStatus(false);
      } else {
        setNotificationsStatus(true);
      }
      console.log(
        "notifications status stored :",
        res === "no",
        notificationsStatus
      );
    } catch (e) {
      console.log("error ", e);
    }
  };
  useEffect(() => {
    checkNotificationsStatus();
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const notificationsJSON = await AsyncStorage.getItem("notifications");
      const storedNotifications = notificationsJSON
        ? JSON.parse(notificationsJSON)
        : [];
      setNotifications(storedNotifications);
      onReceiveNotification();
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const onReceiveNotification = async () => {
    const unseenCount = await getUnseenCount();
    setunSeenNotifications(unseenCount);
  };
  const handleToggleNotifications = async (status) => {
    try {
      if (pushNotificationToken) {
        let url;
        if (status) {
          url = enablePushNotificationsUrl;
        } else {
          url = disbalePushNotifcationsUrl;
        }
        fetch(`${url}${encodeURIComponent(pushNotificationToken)}`)
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
            if (status) {
              storeData(notificationStatusKey, "yes");
              alert("Push Notifications enabled");
              setNotificationsStatus(true);
            } else {
              storeData(notificationStatusKey, "no");
              alert("Push Notifications disabled");
              setNotificationsStatus(false);
            }
          })
          .catch((error) => {
            console.error("Error sending token to backend:", error);
          });
      }
    } catch (error) {
      console.log("error updating notifications togggle:", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          markNotificationAsSeenAsyncStore(item.id).then(() =>
            fetchNotifications()
          );
          Alert.alert(item.title, item.body);
        }}
      >
        <View
          style={[
            styles.notificationItem,
            { backgroundColor: item.status === "unseen" ? "#D4D4D4" : "#fff" },
          ]}
        >
          <Text style={[styles.notificationText, { fontWeight: "bold" }]}>
            {item?.title}
          </Text>
          <Text style={styles.notificationText}>{item?.body}</Text>
          <Text style={([styles.notificationText], { fontSize: 10 })}>
            {item?.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const filteredNotifications = () => {
    let filteredNotifications;
    switch (activeFilter) {
      case "seen":
        filteredNotifications = notifications.filter(
          (notification) => notification.status === "seen"
        );
        break;
      case "unseen":
        filteredNotifications = notifications.filter(
          (notification) => notification.status === "unseen"
        );
        break;
      case "all":
      default:
        filteredNotifications = notifications;
        break;
    }
    return filteredNotifications;
  };
  const finalNotifications = filteredNotifications();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {["all", "unseen", "seen", "clear"].map((x, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
                padding: 4,
                borderWidth: 1,
                borderRadius: 30,
                paddingHorizontal: 12,
                alignItems: "center",
                backgroundColor: activeFilter === x ? "red" : "#fff",
              }}
              onPress={() => {
                if (x === "clear") {
                  clearAllNotifications().then(() => {
                    onReceiveNotification();
                    setNotifications([]);
                  });
                } else {
                  setActiveFilter(x);
                }
              }}
            >
              <Text
                style={{
                  fontFamily: "ABeeZeeRegular",
                  color: activeFilter === x ? "#fff" : "#000",
                }}
              >
                {x}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList data={finalNotifications} renderItem={renderItem} />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 30,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
        onPress={() => {
          handleToggleNotifications(!notificationsStatus);
        }}
      >
        <Text style={{ fontFamily: "ABeeZeeRegular" }}>
          {notificationsStatus
            ? "Disable Notifications"
            : "Enable Notifications"}
        </Text>
        <Ionicons
          name={notificationsStatus ? "notifications" : "notifications-off"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  unseenCount: {
    fontSize: 16,
    marginBottom: 20,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationText: {
    fontSize: 16,
  },
  notificationStatus: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
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
    fontSize: 22,
    color: "#ffffff",
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
  content: {
    padding: 16,
  },
  faqSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  faqQuestion: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  questionText: {
    fontWeight: "bold",
  },
  faqAnswer: {
    padding: 10,
  },
  answerText: {
    color: "#666666",
  },
});

export default NotificationsScreen;
