import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData = async (key, value) => {
  try {
    const res = await AsyncStorage.setItem(key, value);
    console.log("successfully stored data", key, value);
  } catch (error) {
    console.log("error storing data :", error, key, value);
  }
};
