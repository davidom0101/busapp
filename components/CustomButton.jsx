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
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
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
    height: 45,
    width: "50%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#ed2a2b",
  },
  inactiveButton: {
    backgroundColor: "white",
    borderWidth: 1,
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
