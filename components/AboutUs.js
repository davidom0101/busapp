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
        Barrys Coaches is a family run business since 1960. We are a fully licensed National and International bus operator. 
        Although we have grown in strength and size as the years progressed, we have never lost the personal touch that is associated 
        with a small family run operation.
      </Text>
      
      <Image 
        source={require('./path-to-your-image2.jpg')} 
        style={styles.image}
      />
      <Text style={styles.text}>
        We have a diverse customer base from local groups to international corporations, many who continue to be regular customers 
        since our early days, back in 1960, which is testimony to the quality of service and vehicles we deliver. If you are organising 
        a bus tour for your company, community group or travel group and need a top of the range coach with comfortable seats, plenty 
        of leg room, lots of luggage capacity, DVD entertainment, air conditioning and a driver with local knowledge then Barrys Coaches 
        can provide your bus hire solution.
      </Text>

      <Text style={styles.text}>
        From your first contact with Barrys Coaches, right through to booking and travelling on one of our luxury coaches, you will 
        be pleasantly surprised by the professional and courteous manner in which all our staff carry out their duties.
      </Text>

      <Text style={styles.text}>
        All our coaches are maintained and serviced to the highest level, ensuring your safety and comfort. This also greatly reduces 
        the risk of breakdown. However in the unlikely event of this happening, we can organize a swift replacement from any one of 
        base operations and sister companies spread across Ireland.
      </Text>

      <Text style={styles.text}>
        If quality and comfort, coupled with experience and a professional manner are what you are looking for, you will not be disappointed 
        with Barrys Coaches.
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
