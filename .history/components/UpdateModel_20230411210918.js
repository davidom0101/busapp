import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

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

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
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

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,28,28,.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
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
    marginVertical: 10,
    color: "#000000",
  },
  button: {
    width: 100,
    marginHorizontal: 4,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    backgroundColor: "rgba(137, 45, 17, 0.96)",
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.96)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "ABeeZeeRegular",
    fontSize: 17,
    alignSelf: "center",
    marginVertical: 10,
    color: "#fff",
  },
});
