import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Constants from 'expo-constants';

import { CloseIcon, FacebookIcon, TwitterIcon, InstagramIcon, TikTokIcon } from './Icons';

const HomeDrawerContent = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => { navigation.closeDrawer(); }}>
                <CloseIcon />
            </TouchableOpacity>

            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity style={styles.navBtn} onPress={() => {navigation.push("Timetable");}}>
                    <Text style={styles.navBtnText}>Timetables</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => { navigation.push('Detail', { title: 'Track My Bus', url: 'https://leap.futurefleet.com/track-journey/?provider=Q0JPQkNM&lang=en' }) }}>
                    <Text style={styles.navBtnText}>Track My Bus</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => { navigation.push('Detail', { title: 'Coach Hire', url: 'https://corkconnect.ie/app-coach-hire-form/' }) }}>
                    <Text style={styles.navBtnText}>Private Bus Hire</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => { navigation.push('Detail', { title: 'Contact Us', url: 'https://corkconnect.ie/app-contact-us/' }) }}>
                    <Text style={styles.navBtnText}>Contact Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => {navigation.push("FAQs");}}>
                    <Text style={styles.navBtnText}>FAQ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => {navigation.push("AboutUs");}}>
                    <Text style={styles.navBtnText}>About Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => { navigation.push('Detail', { title: 'Fares', url: 'https://corkconnect.ie/app-fares/' }) }}>
                    <Text style={styles.navBtnText}>Fares</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBtn} onPress={() => { navigation.push('Detail', { title: 'News', url: 'https://corkconnect.ie/app-news' }) }}>
                    <Text style={styles.navBtnText}>News</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: 42, justifyContent: 'center' }} onPress={() => { navigation.push('Detail', { title: 'Terms and Privacy Policy', url: 'https://corkconnect.ie/app-terms-and-conditons/' }) }}>
                    <Text style={styles.navBtnText}>Terms and Privacy Policy</Text>
                </TouchableOpacity>
            </ScrollView>

            <Text style={styles.navBtnText}>Follow Us</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity style={{ marginRight: 16 }} onPress={() => { Linking.openURL('https://www.facebook.com/CorkConnect2020/'); }}>
                    <FacebookIcon />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginRight: 16 }} onPress={() => { Linking.openURL('https://twitter.com/connect_cork') }}>
                    <TwitterIcon />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        paddingTop: 64,
        paddingBottom: 32,
        paddingHorizontal: 12,
        marginTop: Constants.statusBarHeight,
        position: 'relative',
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 10,
        padding: 4,
    },
    navBtn: {
        height: 42,
        backgroundColor: 'rgba(237,42,43,.8)',
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 10
    },
    navBtnText: {
        fontFamily: 'ABeeZeeRegular',
        fontSize: 18,
        color: '#000000',
    }
});