import AutoScroll from "@homielab/react-native-auto-scroll";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

const MSG = ["NO ATU Service opertaing untill 14th April"];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const ContinuouslyScrollingText = ({ notice }) => {
  const [welcomeMsg, setWelcomeMsg] = useState(MSG[0]);
  const updateText = () => {
    setWelcomeMsg(MSG[getRandomInt(5)]);
  };

  return (
    <View style={styles.container}>
      <AutoScroll
        duration={8000}
        endPaddingWidth={20}
        style={styles.scrolling2}
      >
        <Text style={styles.notice}>{notice}</Text>
      </AutoScroll>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  notice: {
    fontSize: 12,
    color: "#000",
    fontWeight: "700",
    bottom: 5,
  },
  scrolling2: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: WIDTH - 40,
    height: 30,
    alignSelf: "center",
  },
});

export default ContinuouslyScrollingText;
