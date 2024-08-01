import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { BackIcon } from '../components/Icons'; // Ensure the import path is correct.

const CoachHireScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        dropoffLocation: '',
        departureDate: '',
        departureTime: '',
        returnDate: '',
        returnTime: '',
        vehicleSize: ''
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(formData);
        // Add form submission logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.pop(); }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.titleText}>Coach Hire</Text>
            </View>
            <ScrollView style={styles.content}>
                <TextInput
                    placeholder="Name*"
                    value={formData.name}
                    onChangeText={(text) => handleChange('name', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email*"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone*"
                    value={formData.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Pickup Location*"
                    value={formData.pickupLocation}
                    onChangeText={(text) => handleChange('pickupLocation', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Dropoff Location*"
                    value={formData.dropoffLocation}
                    onChangeText={(text) => handleChange('dropoffLocation', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Date of departure* (dd/mm/yyyy)"
                    value={formData.departureDate}
                    onChangeText={(text) => handleChange('departureDate', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Time of departure* (--:--)"
                    value={formData.departureTime}
                    onChangeText={(text) => handleChange('departureTime', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Date of return* (dd/mm/yyyy)"
                    value={formData.returnDate}
                    onChangeText={(text) => handleChange('returnDate', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Time of return* (--:--)"
                    value={formData.returnTime}
                    onChangeText={(text) => handleChange('returnTime', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Size of Vehicle*"
                    value={formData.vehicleSize}
                    onChangeText={(text) => handleChange('vehicleSize', text)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    submitButton: {
        backgroundColor: '#ed2a2b', // same color as header
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    submitButtonText: {
        color: '#ffffff', // white text
        fontSize: 18,
    }
});

export default CoachHireScreen;
