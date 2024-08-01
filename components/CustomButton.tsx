import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({
  customStyles,
  label1,
  label2,
  onPress,
  labelStyle,
  activeButton,
  marginB,
}) => {
  return (
    <View
      style={[
        styles.buttonLayout,
        {
          marginBottom: marginB,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(label1)}
        style={[
          styles.button,
          {
            borderRightWidth: 0,
          },
          activeButton === label1 && styles.activeButton,
          activeButton === label2 && styles.inactiveButton,
        ]}
      >
        <Text
          style={[
            styles.label,
            labelStyle,
            activeButton === label1 && styles.activeLabel,
          ]}
        >
          {label1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            borderLeftWidth: 0,
          },
          activeButton === label2 && styles.activeButton,
          activeButton === label1 && styles.inactiveButton,
        ]}
        onPress={() => onPress(label2)}
      >
        <Text
          style={[
            styles.label,
            labelStyle,
            activeButton === label2 && styles.activeLabel,
          ]}
        >
          {label2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 16,
  },
  button: {
    height: 49,
    width: "50%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#000000",
  },
  inactiveButton: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  label: {
    fontSize: 14,
    color: "black",
    fontWeight: "600",
  },
  activeLabel: {
    color: "white",
  },
});

export default CustomButton;
