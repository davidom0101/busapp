import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
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
      statusBarTranslucent
    >
      <View style={styles.wrapContainer}>
        <View style={styles.container}>
          <Image
            style={styles.closeImage}
            source={require("./../assets/close.png")}
          />
          <Image
            style={styles.headerLogo}
            source={require("./../assets/BB-Logo.png")}
          />
          <Text style={styles.text}>Please update to the last version</Text>

          <TouchableOpacity
            onPress={() => {
              const url =
                Platform.OS === "android"
                  ? "https://play.google.com/store/apps/details?id=com.attiq101.BURKESBUS"
                  : "https://apps.apple.com/ie/app/burkesbus/id6446148429";
              Linking.openURL(url);
            }}
            style={styles.button}
          >
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
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
  },
  container: {
    width: "80%",
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
  closeImage: {
    width: 40,
    height: 40,
    marginTop: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  headerLogo: {
    width: 224,
    height: 40,
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
    paddingVertical: 3,
    paddingHorizontal: 15,
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
