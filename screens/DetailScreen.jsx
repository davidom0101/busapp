import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Constants from 'expo-constants';

import { BackIcon } from '../components/Icons';

const DetailScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBth} onPress={() => { navigation.pop(); }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.titleText}>{route.params.title}</Text>
            </View>

            <WebView
                style={{ flex: 1 }}
                source={{ uri: route.params.url }} 
            />
        </View>
    )
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    header: {
        backgroundColor: '#ed2a2b',
        height: 56 + Constants.statusBarHeight,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: Constants.statusBarHeight,
    },
    titleText: {
        fontFamily: 'ABeeZeeRegular',
        fontSize: 22,
        color: '#ffffff',
    },
    backBth: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
});