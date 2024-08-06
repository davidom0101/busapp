import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutUsScreen from "../screens/AboutUsScreen";
import FAQsScreen from "../screens/FAQsScreen";
import HomeDrawerContent from "../components/HomeDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import CoachHireScreen from "../screens/CoachHireScreen";
import TimetableScreen from "../screens/TimetableScreen";
import TrackMyBusScreen from "../screens/TrackMyBusScreen";
import NotificationsScreen from "../screens/Notifications";
import * as Notifications from "expo-notifications";
import { getUnseenCount } from "../components/helperFunctions";

import { useGlobalStateStore } from "../components/globalStateStore";
import * as Linking from "expo-linking";
import PDFViewer from "../screens/PDFViewer";

const prefix = Linking.createURL("/");
const Drawer = createDrawerNavigator();

const HomeSideDrawer = (navigation) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <HomeDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
        },
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const setunSeenNotifications = useGlobalStateStore(
    (s) => s.setunSeenNotifications
  );
  const onReceiveNotification = async () => {
    const unseenCount = await getUnseenCount();
    setunSeenNotifications(unseenCount);
  };
  return (
    <NavigationContainer
      linking={{
        prefixes: [Linking.createURL("/")],
        config: {
          screens: {
            Notifications: "Notifications",
          },
        },
        async getInitialURL() {
          const url = await Linking.getInitialURL();
          if (url != null) {
            return url;
          }
          const response =
            await Notifications.getLastNotificationResponseAsync();
          return response?.notification.request.content.data?.screen;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }) => {
            listener(url);
          };

          const eventListenerSubscription = Linking.addEventListener(
            "url",
            onReceiveURL
          );

          const subscription =
            Notifications.addNotificationResponseReceivedListener(
              (response) => {
                listener(response.notification.request.content.data?.screen);
              }
            );

          return () => {
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeSideDrawer} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="FAQs" component={FAQsScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="CoachHire" component={CoachHireScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen name="TrackMyBus" component={TrackMyBusScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="PDFViewer" component={PDFViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
