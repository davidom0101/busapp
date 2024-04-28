import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutUsScreen from '../screens/AboutUsScreen';
import FAQsScreen from '../screens/FAQsScreen'; 
import HomeDrawerContent from '../components/HomeDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import CoachHireScreen from '../screens/CoachHireScreen';
import TimetableScreen from '../screens/TimetableScreen';
import TrackMyBusScreen from '../screens/TrackMyBusScreen';

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
            }}>
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

const Stack = createStackNavigator(); 

export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
                <Stack.Screen name="Home" component={HomeSideDrawer} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="AboutUs" component={AboutUsScreen} />
                <Stack.Screen name="FAQs" component={FAQsScreen} />
                <Stack.Screen name="ContactUs" component={ContactUsScreen} />
                <Stack.Screen name="CoachHire" component={CoachHireScreen} />
                <Stack.Screen name="Timetable" component={TimetableScreen} />
                <Stack.Screen name="TrackMyBus" component={TrackMyBusScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};