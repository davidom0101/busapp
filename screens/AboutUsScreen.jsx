import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { BackIcon } from '../components/Icons'; // Ensure the import path is correct.

const AboutUsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.pop(); }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.titleText}>About Us</Text>
            </View>
            <ScrollView style={styles.container}>
            <Image 
                    source={require('./../assets/about1.jpg')} // Update this path
                    style={styles.image}
                    resizeMode="cover" // or "contain", depending on your needs
            />
<Text style={styles.title}>Our Service</Text>
<Text style={styles.paragraph}>
    Cobh Connect is a fast, comfortable coach service linking Cobh and Cork City. We are an Irish owned 
    company offering a low cost, high value service for the residents of Cobh and Great Island. We offer 
    up to 40 departures seven days a week and have multiple designated pick up and drop off points 
    strategically located around the town on its journey to Cork City. Beginning at 06.15 in the morning, 
    this fast and frequent service will journey to Cork finishing at Patrick’s Quay and the service 
    continues into the evening with a Nitelink Service every Friday, Saturday, and Bank Holiday Sundays.
</Text>
<Text style={styles.title}>Our Fleet</Text>
<Text style={styles.paragraph}>
    Cobh Connect operates a fleet of fully seated, air-conditioned executive coaches, all of which are 4G 
    Wi-Fi enabled with charging points on board as standard. The fleet of modern, high-capacity buses 
    aims to make the daily commute for secondary school students and students of colleges such as 
    UCC, CIT, and the College of Commerce, more flexible, reliable and affordable. Cobh Connect operates 
    a mixed fleet of fully automatic transmission and air ride suspension fitted coaches. Coaches are 
    fitted with recliner seating, climate control, on-board 4G Wi-Fi, and safety belts are fitted to every 
    seat. Overhead soft lighting, reading lamps, directional air conditioning nozzles, baggage shelves 
    and skylights are standard throughout the Cobh Connect fleet.
</Text>
<Text style={styles.paragraph}>
    Cobh Connect – Your Connection to Cork! If you have any questions or queries, please do contact us. We would love to hear from you.
</Text>


        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#ed2a2b',
        height: 56 + Constants.statusBarHeight,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        fontFamily: 'ABeeZeeRegular',  // Maintains consistency with your titleText font
        fontSize: 20,                 // Slightly smaller than the header title, but prominent
        color: '#333333',             // A dark color for high readability, less stark than black
        marginTop: 20,                // Adds space above the title for clear section separation
        marginBottom: 10,             // Space below the title before the paragraph text starts
        paddingLeft: 20,              // Aligns text with the paragraph padding
        paddingRight: 20,             // Maintains right padding consistency
        fontWeight: 'bold',           // Makes the title stand out more
    },    
    titleText: {
        fontFamily: 'ABeeZeeRegular',
        fontSize: 22,
        color: '#ffffff',
    },
    backBtn: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 16,
    },
    image: {
        width: 180,
        height: 135,
        marginBottom: 16,
        marginTop: 16,
        alignSelf: 'center',
    },
    paragraph: { 
        marginBottom: 16,
        fontSize: 16,
        lineHeight: 24,
        paddingLeft:20,
        paddingRight:20,
    }
});

export default AboutUsScreen;
