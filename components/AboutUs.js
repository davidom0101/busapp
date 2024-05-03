import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
<ScrollView style={styles.container}>
  <Text style={styles.title}>About Us</Text>

  <Image 
    source={require('./path-to-your-image1.jpg')} 
    style={styles.image}
  />
  <Text style={styles.text}>
    Cobh Connect is a fast, comfortable coach service linking Cobh and Cork City. We are an Irish owned 
    company offering a low cost, high value service for the residents of Cobh and Great Island. We offer 
    up to 40 departures seven days a week and have multiple designated pick up and drop off points 
    strategically located around the town on its journey to Cork City. Beginning at 06.15 in the morning, 
    this fast and frequent service will journey to Cork finishing at Patrick’s Quay and the service 
    continues into the evening with a Nitelink Service every Friday, Saturday, and Bank Holiday Sundays.
  </Text>
  
  <Image 
    source={require('./path-to-your-image2.jpg')} 
    style={styles.image}
  />
  <Text style={styles.text}>
    Cobh Connect operates a fleet of fully seated, air-conditioned executive coaches, all of which are 4G 
    Wi-Fi enabled with charging points on board as standard. The fleet of modern, high-capacity buses 
    aims to make the daily commute for secondary school students and students of colleges such as 
    UCC, CIT, and the College of Commerce, more flexible, reliable and affordable. Cobh Connect operates 
    a mixed fleet of fully automatic transmission and air ride suspension fitted coaches. Coaches are 
    fitted with recliner seating, climate control, on-board 4G Wi-Fi, and safety belts are fitted to every 
    seat. Overhead soft lighting, reading lamps, directional air conditioning nozzles, baggage shelves 
    and skylights are standard throughout the Cobh Connect fleet.
  </Text>

  <Text style={styles.text}>
    Cobh Connect – Your Connection to Cork!
  </Text>

  <Text style={styles.text}>
    If you have any questions or queries, please do contact us. We would love to hear from you.
  </Text>
</ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  }
});

export default AboutUs;
