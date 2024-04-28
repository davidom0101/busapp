import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

const UpdateModal = ({ visible, onRequestClose = () => {} }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
      transparent
    >
      <View style={styles.container}>
        <Text></Text>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
