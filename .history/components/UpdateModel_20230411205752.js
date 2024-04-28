import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

const UpdateModal = ({ visible, onRequestClose = () => {} }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
      style={styles.modalContainer}
      animationType="slide"
    >
      <View
        style={styles.wrapContainer}
      >
        <View style={styles.container}>
          <Text>Please update to the last version</Text>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    backgroundColor:"red"
  },
  wrapContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    alignSelf: "center",
    height: "50%",
  },
  text: {
    fontFamily: "ABeeZeeRegular",
    fontSize: 18,
    color: "#000000",
  },
});
