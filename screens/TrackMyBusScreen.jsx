import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { BackIcon } from '../components/Icons'; // Ensure the import path is correct.

const TrackMyBusScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.pop(); }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.titleText}>Track My Bus</Text>
            </View>
            <ScrollView style={styles.container}>

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

export default TrackMyBusScreen;
