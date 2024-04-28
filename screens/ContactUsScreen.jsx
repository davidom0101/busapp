import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import Constants from 'expo-constants';
import { BackIcon } from '../components/Icons'; 

const ContactUsScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        // Handle the submission of the form data here
        // Example: send data to an API or a server
        alert(`Message Sent!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.pop(); }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.titleText}>Contact Us</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Name" 
                        value={name} 
                        onChangeText={setName}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Subject" 
                        value={subject} 
                        onChangeText={setSubject}
                    />
                    <TextInput 
                        style={styles.inputMultiline} 
                        placeholder="Message" 
                        value={message} 
                        onChangeText={setMessage}
                        multiline
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
    form: {
        padding: 16,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    inputMultiline: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        height: 100,
    },
    submitButton: {
        backgroundColor: '#ed2a2b',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default ContactUsScreen;
