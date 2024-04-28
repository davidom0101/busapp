import React from "react";
import { Modal, View, Text } from "react-native";

const UpdateModal = ({ visible, onRequestClose = () => {} }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
      transparent
    >
      <View>
        <Text></Text>
      </View>
    </Modal>
  );
};

export default UpdateModal;
