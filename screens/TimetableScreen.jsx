import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { BackIcon } from "../components/Icons";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import constants from "../constants/constants";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem = ({ children, title, expanded, onHeaderPress }) => {
  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={onHeaderPress}>
        {expanded ? (
          <Entypo
            name="minus"
            size={24}
            color={expanded ? "#ed2a2b" : "#000000"}
          />
        ) : (
          <Entypo name="plus" size={24} color="black" />
        )}
        <Text
          style={[
            styles.accordTitle,
            {
              color: expanded ? "#ed2a2b" : "#000000",
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
};

const Accordion = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  function handleHeaderPress(index) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          expanded={expandedIndex === index}
          onHeaderPress={() => handleHeaderPress(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </>
  );
};

const TimetableScreen = ({ navigation }) => {
  const [activeDay, setActiveDay] = useState("Mon-Fri");
  const [activeButton, setActiveButton] = useState(
    "Little Island To Hollyhill"
  );
  const [activeButton2, setActiveButton2] = useState("Cobh to Cork");
  const [activeButton3, setActiveButton3] = useState(
    "Cobh – Carrigtwohill – Little Island"
  );
  const [timetables, setTimetables] = useState([]);
  const [timetables2, setTimetables2] = useState([]);
  const [timetables3, setTimetables3] = useState([]);
  const [litf, setLitf] = useState([]);
  const [ccli, setCcli] = useState([]);
  const [ccr, setCcr] = useState([]);
  const [loadLitf, setLoadLitf] = useState(false);
  const [loadCcli, setLoadCcli] = useState(false);
  const [loadCcr, setLoadCcr] = useState(false);

  useEffect(() => {
    getAllDataFromCollection();
    getAllDataOfCCRFromCollection();
    getAllDataCCLIFromCollection();
  }, []);

  const getAllDataFromCollection = async () => {
    try {
      setLoadLitf(true);
      const collectionRef = collection(db, "LITF");
      const querySnapshot = await getDocs(collectionRef);

      const allData = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const { stops, direction } = doc.data();
          allData.push({ id: doc.id, direction, stops });
        } else {
          console.log("No such document with ID: ", doc.id);
        }
      });
      const filteredData = allData.filter((item) => {
        return item.direction == activeButton;
      });
      const stops = filteredData.length > 0 ? filteredData[0].stops : [];
      setLitf(stops);
      setTimetables(allData);
      setLoadLitf(false);
    } catch (error) {
      console.error("Error getting documents from collection:", error);
      throw error;
    }
  };

  const getAllDataCCLIFromCollection = async () => {
    try {
      setLoadCcli(true);
      const collectionRef = collection(db, "CCLI");
      const querySnapshot = await getDocs(collectionRef);

      const allData = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const { stops, direction } = doc.data();
          allData.push({ id: doc.id, direction, stops });
        } else {
          console.log("No such document with ID: ", doc.id);
        }
      });
      const filteredData = allData.filter((item) => {
        return item.direction == activeButton3;
      });
      const stops = filteredData.length > 0 ? filteredData[0].stops : [];
      setCcli(stops);
      setTimetables3(allData);
      setLoadCcli(false);
    } catch (error) {
      console.error("Error getting documents from collection:", error);
      throw error;
    }
  };

  const getAllDataOfCCRFromCollection = async () => {
    try {
      setLoadCcr(true);
      const collectionRef = collection(db, "CCR");
      const querySnapshot = await getDocs(collectionRef);

      const allData = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const { stopName, times, direction, daysRunning } = doc.data();
          allData.push({ id: doc.id, direction, stopName, times, daysRunning });
        } else {
          console.log("No such document with ID: ", doc.id);
        }
      });
      const filteredDataByDaysRunning = allData.filter((item) => {
        return item.daysRunning == activeDay;
      });

      const filteredData = filteredDataByDaysRunning.filter((item) => {
        return item.direction === activeButton2;
      });
      setCcr(filteredData);
      setTimetables2(allData);
      setLoadCcr(false);
    } catch (error) {
      console.error("Error getting documents from collection:", error);
      throw error;
    }
  };

  function handleButtonPress(buttonLabel) {
    setActiveButton(buttonLabel);
    const filteredData = timetables.filter((item) => {
      return item.direction == buttonLabel;
    });
    const stops = filteredData.length > 0 ? filteredData[0].stops : [];
    setLitf(stops);
  }

  function handleButtonPress2(buttonLabel) {
    setActiveButton2(buttonLabel);
    const filteredData = timetables2.filter((item) => {
      return item.daysRunning == activeDay;
    });

    const filteredData2 = filteredData.filter((item) => {
      return item.direction == buttonLabel;
    });
    setCcr(filteredData2);
  }

  function handleButtonPress3(buttonLabel) {
    setActiveButton3(buttonLabel);
    const filteredData = timetables3.filter((item) => {
      return item.direction == buttonLabel;
    });
    const stops = filteredData.length > 0 ? filteredData[0].stops : [];
    setCcli(stops);
  }

  function handleDayPress(day) {
    setActiveDay(day);
    const filteredDataByDaysRunning = timetables2.filter((item) => {
      return item.daysRunning === day;
    });

    const filteredData = filteredDataByDaysRunning.filter((item) => {
      return item.direction === activeButton2;
    });
    setCcr(filteredData);
  }

  function renderCorkConnectTimetable() {
    return (
      <View style={styles.timeTableContainer}>
        <Text style={styles.heading}>Cork Connect Timetables</Text>
        <View style={styles.headingContainer}>
          <Text style={styles.heading2}>Little Island To Hollyhill </Text>
          <Text style={styles.heading2}>Mon - Fri </Text>
        </View>
        <CustomButton
          label1="Little Island To Hollyhill"
          label2="Hollyhill To Little Island"
          activeButton={activeButton}
          onPress={handleButtonPress}
          marginB={20}
        />
        <Accordion
          data={litf.map((stop, index) => ({
            title: stop.stop_name,
            content: (
              <View key={index}>
                {stop.times.map((time, i) => (
                  <Text
                    style={{
                      fontSize: 16,
                      paddingTop: 5,
                      color: "black",
                      fontWeight: "400",
                    }}
                    key={i}
                  >
                    {time}
                  </Text>
                ))}
              </View>
            ),
          }))}
        />
      </View>
    );
  }

  function renderCobhConnectTimetable() {
    return (
      <View style={[styles.timeTableContainer, { marginVertical: 20 }]}>
        <Text style={styles.heading}>Cobh Connect Timetables</Text>
        <View style={styles.headingContainer}>
          <Text style={styles.heading2}>Cobh - Cork Route 200 </Text>
        </View>
        <CustomButton
          label1="Cobh to Cork"
          label2="Cork to Cobh"
          activeButton={activeButton2}
          onPress={handleButtonPress2}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          horizontal
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          {constants.days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                {
                  backgroundColor: activeDay === day.name ? "#ed2a2b" : "white",
                  borderWidth: activeDay === day.name ? 0 : 1,
                },
              ]}
              onPress={() => handleDayPress(day.name)}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  { color: activeDay === day.name ? "white" : "black" },
                ]}
              >
                {day.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Accordion
          data={ccr.map((stop, index) => ({
            title: stop.stopName,
            content: (
              <View key={index}>
                {stop.times.map((time, i) => (
                  <Text style={styles.timeStyle} key={i}>
                    {time}
                  </Text>
                ))}
              </View>
            ),
          }))}
        />
      </View>
    );
  }

  function renderCobhCarrigtwohillTimetable() {
    return (
      <View style={{ marginVertical: 20 }}>
        <View>
          <Text style={styles.heading2}>
            Cobh - Carrigtwohill - Little Island
          </Text>
        </View>
        <CustomButton
          label1="Cobh – Carrigtwohill – Little Island"
          label2="Little Island – Carrigtwohill – Cobh"
          activeButton={activeButton3}
          onPress={handleButtonPress3}
          marginB={20}
          labelStyle={{
            fontSize: 12,
          }}
        />
        <Accordion
          data={ccli.map((stop, index) => ({
            title: stop.stop_name,
            content: (
              <View key={index}>
                {stop.times.map((time, i) => (
                  <Text
                    style={{
                      fontSize: 16,
                      paddingTop: 5,
                      color: "black",
                      fontWeight: "400",
                    }}
                    key={i}
                  >
                    {time}
                  </Text>
                ))}
              </View>
            ),
          }))}
        />
      </View>
    );
  }

  if (loadCcli && loadCcr && loadLitf) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} color="#ed2a2b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.pop();
          }}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.titleText}>Timetables</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}
      >
        {renderCorkConnectTimetable()}
        {renderCobhConnectTimetable()}
        {renderCobhCarrigtwohillTimetable()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#ed2a2b",
    height: 56 + Constants.statusBarHeight,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  titleText: {
    fontFamily: "ABeeZeeRegular",
    fontSize: 22,
    color: "#ffffff",
  },
  backBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  timeTableContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    textAlign: "center",
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  heading2: {
    textAlign: "center",
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
  },

  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: "#fff",
    color: "#eee",
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
  },
  accordTitle: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "#000000",
    paddingRight: 15,
  },
  accordBody: {
    padding: 12,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  textSmall: {
    fontSize: 16,
  },
  headingContainer: {
    marginTop: 40,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeStyle: {
    fontSize: 16,
    paddingTop: 5,
    color: "black",
    fontWeight: "400",
  },
});

export default TimetableScreen;
