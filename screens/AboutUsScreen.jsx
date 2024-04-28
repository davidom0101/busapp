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
<Text style={styles.paragraph}>
    Cork and Cobh Connect represent a leading, Irish-owned coach service, offering a seamless and comfortable journey linking Little Island, Cobh, and Hollyhill directly with Cork City Centre. Our mission is to provide a low-cost, high-value commuting solution for the residents of Little Island, Cobh, Great Island, and the surrounding areas, enhancing the connectivity and accessibility of Cork City.
</Text>
<Text style={styles.paragraph}>
    With up to 72 departures across seven days a week, our services are designed to cater to the diverse needs of our passengers. Our strategically located pick-up and drop-off points in Little Island, Cobh, and along the route ensure convenience and efficiency for your daily commute. Our services commence bright and early at quarter past six in the morning, ensuring that you reach your destination on time, whether it's for school, college, work, or leisure. For those late-night journeys, our Nitelink Service operates every Friday, Saturday, and Bank Holiday Sunday, providing a safe and reliable option for your nighttime travel needs.
</Text>
<Text style={styles.paragraph}>
    Our fleet consists of modern, fully seated, air-conditioned executive coaches, all equipped with 4G Wi-Fi and onboard charging points, setting a new standard in commuter comfort. The high-capacity buses are designed to support the daily routines of secondary school students and college students from UCC, CIT, and the College of Commerce, making education more accessible and travel stress-free.
</Text>
<Text style={styles.paragraph}>
    Safety, comfort, and reliability are at the core of our services. Our coaches feature fully automatic transmission, air ride suspension, recliner seating, climate control, and safety belts for every seat. Additional amenities such as overhead soft lighting, reading lamps, directional air conditioning nozzles, baggage shelves, and skylights ensure a pleasant and enjoyable journey for all our passengers.
</Text>
<Text style={styles.paragraph}>
    Cork and Cobh Connect – Your Premier Connection to Cork, offering a blend of efficiency, comfort, and value, all while keeping you connected to what matters most.
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
