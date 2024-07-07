import AsyncStorage from "@react-native-async-storage/async-storage";
export const handleNotificationAsyncStore = async (notification) => {
  try {
    const notificationsJSON = await AsyncStorage.getItem("notifications");
    const notifications = notificationsJSON
      ? JSON.parse(notificationsJSON)
      : [];
 
    const isDuplicate = notifications.some((n) => n.id === notification.id);

    if (!isDuplicate) {
      notifications.push(notification);
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify([])
      );
    }

    const unseenCount = notifications.filter(
      (n) => n.status === "unseen"
    ).length;
    await AsyncStorage.setItem("unseenCount", unseenCount.toString());
  } catch (error) {
    console.error("Error handling notification:", error);
  }
};

export const getNotifications = async () => {
  try {
    const notificationsJSON = await AsyncStorage.getItem("notifications");
    return notificationsJSON ? JSON.parse(notificationsJSON) : [];
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    return [];
  }
};

export const getUnseenCount = async () => {
  try {
    const unseenCount = await AsyncStorage.getItem("unseenCount");
    return unseenCount ? parseInt(unseenCount, 10) : 0;
  } catch (error) {
    console.error("Error retrieving unseen count:", error);
    return 0;
  }
};

export const storeData = async (key, value) => {
  try {
    const res = await AsyncStorage.setItem(key, value);
    console.log("successfully stored data", key, value);
  } catch (error) {
    console.log("error storing data :", error, key, value);
  }
};
