import React from "react";
import { Modal, View, Text, StyleSheet, Image } from "react-native";

const UpdateModal = ({ visible, onRequestClose = () => {} }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
      style={styles.modalContainer}
      animationType="slide"
      transparent
    >
      <View style={styles.wrapContainer}>
        <View style={styles.container}>
          <Image
            style={styles.headerLogo}
            source={require("./../assets/BB-Logo.png")}
          />
          <Text style={styles.text}>Please update to the last version</Text>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  wrapContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    marginTop: "50%",
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  headerLogo: {
    width: 224,
    height: 44,
    alignSelf: "center",
    marginVertical: 10,
    resizeMode: "contain",
  },
  text: {
    fontFamily: "ABeeZeeRegular",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 10,
    color: "#000000",
  },
});
