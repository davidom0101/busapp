import React from "react";
import { Modal, View, Text } from "react-native";

const UpdateModal = ({ visible, onRequestClose = () => {} }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}
    >
      <View>
        <Text></Text>
      </View>
    </Modal>
  );
};

export default UpdateModal;
