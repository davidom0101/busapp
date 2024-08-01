import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Constants from 'expo-constants';
import { BackIcon } from '../components/Icons'; // Ensure the import path is correct.

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CorkConnectFAQs = [
    {
        "question": "What ticket types do you offer?",
        "answer": "We offer single journey tickets, day return tickets, 10 journey tickets and monthly tickets. Tickets can be purchased with cash directly from the driver, by Card from our office on Patricks Quay and with your Leap from the driver and our office. Day return tickets are only valid on the calendar date of purchase. 10 journey tickets are valid for 1 month from date of purchase. Leap Cards cannot be used by more than one passenger on the same journey."
    },
    {
        "question": "Does the driver carry change?",
        "answer": "Yes, our drivers will carry change but only a limited amount. Further information on our fares can be found here."
    },
    {
        "question": "What are your fares?",
        "answer": "We offer a number of different fares, full details of which can be found here."
    },
    {
        "question": "Does my ten journey ticket have an expiry date?",
        "answer": "Yes. Your ten journeys must be used within 30 days of product purchase."
    },
    {
        "question": "What forms of student identification do you accept on Cork Connect?",
        "answer": "We accept the Student Travel Card and the ISIC Card on Cork Connect. No other forms of student identification are accepted at this time."
    },
    {
        "question": "What is your policy on the use of e-cigarettes?",
        "answer": "We do not permit the use of e-cigarettes on any of our buses."
    },
    {
        "question": "Can I bring my pet on the bus?",
        "answer": "We do not allow animals on the bus, with the exception of guide dogs."
    },
    {
        "question": "Can I bring my bicycle or pram on the bus?",
        "answer": "There is space for bicycles/prams in the storage compartment underneath the bus, however please be advised that the driver will need to open this compartment for you and this may delay other passengers who are waiting to board the bus."
    },
    {
        "question": "Are free travel passes accepted on Cork Connect?",
        "answer": "We accept free travel passes on all services."
    },
    {
        "question": "Can I eat/drink on board the bus?",
        "answer": "In the interest of safety and out of consideration for your fellow passengers, we would ask that you refrain from eating and drinking on Cork Connect coaches. Hot Beverages and hot food are not allowed to be consumed on the coaches."
    },
    {
        "question": "What are the age restrictions on your child fares?",
        "answer": "We offer child fares to anyone under the age of 16 and children under the age of 3 travel free on Cork Connect. Students over the age of 16 must have valid ID."
    },
    {
        "question": "Do you operate wheelchair accessible vehicles?",
        "answer": "Cork Connect has a number of wheelchair accessible vehicles, however not all stops on our route are accessible. If you require a wheelchair space, it must be booked 24 hours in advance by calling 021 – 4551720 so we can ensure that a vehicle is available."
    },
    {
        "question": "How long is lost property held for?",
        "answer": "Unclaimed lost property will be kept for 30 days."
    }
];

const CobhConnectFAQs = [
    {
        "question": "What ticket types do you offer?",
        "answer": "We offer single journey tickets, day return tickets, 10 journey tickets and monthly tickets. Tickets can be purchased with cash directly from the driver, by Card from our office on Patricks Quay and with your Leap from the driver and our office. Day return tickets are only valid on the calendar date of purchase. 10 journey tickets are valid for 1 month from date of purchase."
    },
    {
        "question": "What Night Link Services do you offer?",
        "answer": "The night link fare is €6 single or €8 return. Night link services from Cobh to Cork City are 21.45hrs and 23.30hrs Friday, Saturday, and Bank Holiday Sunday. Night link services from Cork City to Cobh are 22.45hrs and 00.15hrs Friday, Saturday, and Bank Holiday Sunday. Social welfare passes are not accepted on night link services. No concession, student or child tickets accepted on night link services. Return tickets, 10 journey tickets, Monthly tickets and TaxSaver tickets are valid for use on night link services with €2 supplement per journey."
    },
    {
        "question": "Does the driver carry change?",
        "answer": "Yes, our drivers will carry change but only a limited amount."
    },
    {
        "question": "What are your fares?",
        "answer": "We offer a number of different fares, full details of which can be found here."
    },
    {
        "question": "Does my ten journey ticket have an expiry date?",
        "answer": "Yes. Your 10 journeys must be used within 30 days from date of purchase."
    },
    {
        "question": "What forms of student identification do you accept on Cobh Connect?",
        "answer": "We accept the Student Travel Card and the ISIC Card on Cobh Connect. No other forms of student identification are accepted at this time."
    },
    {
        "question": "What is your policy on the use of e-cigarettes?",
        "answer": "We do not permit the use of e-cigarettes on any of our buses."
    },
    {
        "question": "Can I bring my pet on the bus?",
        "answer": "We do not allow animals on the bus, except for guide dogs/service dogs."
    },
    {
        "question": "Can I bring my bicycle or pram on the bus?",
        "answer": "There is space for bicycles/prams in the storage compartment underneath the bus, however, please be advised that use of this space is at your own risk."
    },
    {
        "question": "Are free travel passes accepted on Cobh Connect?",
        "answer": "We accept free travel passes on all services, except Night link services. Passes must be shown to the driver and be in date."
    },
    {
        "question": "Can I eat/drink on board the bus?",
        "answer": "In the interest of safety and out of consideration for your fellow passengers, we would ask that you refrain from eating and drinking on Cobh Connect coaches. Hot Beverages and hot food are not allowed to be consumed on the coaches."
    },
    {
        "question": "What are the age restrictions on your child fares?",
        "answer": "We offer child fares to anyone under the age of 16 and children under the age of 3 travel free on Cobh Connect. Students over the age of 16 must have valid ID."
    },
    {
        "question": "What is the fare for a journey taken within Cobh?",
        "answer": "Journeys taken within Cobh are €1.50. Please visit our fares page for full details of all of our fares."
    },
    {
        "question": "Do you operate wheelchair accessible vehicles?",
        "answer": "Cobh Connect has several wheelchair accessible vehicles, however not all stops on our route are accessible. If you require a wheelchair space, it must be booked 24 hours in advance by calling 021 – 4551720 so we can ensure that a vehicle is available."
    },
    {
        "question": "How long is lost property held for?",
        "answer": "Unclaimed lost property will be kept for 30 days."
    }
];

const FAQsScreen = ({ navigation }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handlePress = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.pop(); }}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.titleText}>FAQs</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.faqSectionTitle}>Cork Connect FAQs</Text>
                {CorkConnectFAQs.map((faq, index) => (
                    <View key={index} style={styles.faqItem}>
                        <TouchableOpacity style={styles.faqQuestion} onPress={() => handlePress(index)}>
                            <Text style={styles.questionText}>{faq.question}</Text>
                        </TouchableOpacity>
                        {expandedIndex === index && (
                            <View style={styles.faqAnswer}>
                                <Text style={styles.answerText}>{faq.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
                <Text style={styles.faqSectionTitle}>Cobh Connect FAQs</Text>
                {CobhConnectFAQs.map((faq, index) => (
                    <View key={index + CorkConnectFAQs.length} style={styles.faqItem}>
                        <TouchableOpacity style={styles.faqQuestion} onPress={() => handlePress(index + CorkConnectFAQs.length)}>
                            <Text style={styles.questionText}>{faq.question}</Text>
                        </TouchableOpacity>
                        {expandedIndex === index + CorkConnectFAQs.length && (
                            <View style={styles.faqAnswer}>
                                <Text style={styles.answerText}>{faq.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
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
    faqSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    faqItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    faqQuestion: {
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    questionText: {
        fontWeight: 'bold',
    },
    faqAnswer: {
        padding: 10,
    },
    answerText: {
        color: '#666666',
    },
});

export default FAQsScreen;
