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
import * as IntentLauncher from "expo-intent-launcher";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import constants from "../constants/constants";
import { collection, getDocs } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { db } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const cellWidth = 70;
const cellHeight = 110;

const AccordionItem = ({ children, title, expanded, onHeaderPress }) => {
  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity
        style={[
          styles.accordHeader,
          {
            borderBottomLeftRadius: expanded ? 0 : 9,
            borderBottomRightRadius: expanded ? 0 : 9,
          },
        ]}
        onPress={onHeaderPress}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.accordTitle}>{title}</Text>
        </View>

        {expanded ? (
          <AntDesign name="caretup" size={16} color="white" />
        ) : (
          <AntDesign name="caretdown" size={16} color="white" />
        )}
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

const TimetableScreen = () => {
  const [activeDay, setActiveDay] = useState("Mon-Fri");
  const navigation = useNavigation();
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
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Little Island");
  const [downloadProgress, setDownloadProgress] = useState(0);

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

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const generatePDF = async () => {
    setLoading(true);
    try {
      let pdfUrl = "";

      // Determine the PDF URL based on selectedOption
      if (selectedOption === "Little Island") {
        pdfUrl =
          "https://drive.google.com/uc?export=download&id=1zYSMcWpBhVacdXP_3uD93s2c-uB4Vbko";
      } else if (selectedOption === "Cobh - Cork Route 200") {
        pdfUrl =
          "https://drive.google.com/uc?export=download&id=1AClWlHgAVZQpLcv6fCcG6yx5rSRSXJtX";
      } else if (selectedOption === "Cobh - Carrigtwohill - Little Island") {
        pdfUrl =
          "https://drive.google.com/uc?export=download&id=12psmZW_yf8LZdUBUmrqF70Q8mxqO37dt";
      } else {
        // Handle the case where selectedOption doesn't match any known options
        console.error("Invalid selectedOption:", selectedOption);
        setLoading(false);
        return;
      }
      const cache = await AsyncStorage.getItem(selectedOption);
      if (cache) {
        if (Platform.OS === "android") {
          // For Android
          const contentUri = await FileSystem.getContentUriAsync(cache);
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: contentUri,
            flags: 1,
            type: "application/pdf",
          });
        } else {
          // For iOS
          Linking.openURL(cache);
        }
        setLoading(false);
      } else {
        const customFolderUri =
          FileSystem.documentDirectory + "Cobh_TimeTables" + "/";
        const folderInfo = await FileSystem.getInfoAsync(customFolderUri);
        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(customFolderUri, {
            intermediates: true,
          });
        }
        const downloadResumable = FileSystem.createDownloadResumable(
          pdfUrl,
          customFolderUri + selectedOption + ".pdf",
          {},
          (progress) => {
            const p =
              (progress.totalBytesWritten /
                progress.totalBytesExpectedToWrite) *
              100;
            setDownloadProgress(p.toFixed(0));
            console.log(
              `Downloaded ${progress.totalBytesWritten} of ${progress.totalBytesExpectedToWrite} bytes.`
            );
          }
        );
        const { uri } = await downloadResumable.downloadAsync();
        await AsyncStorage.setItem(selectedOption, uri);
        if (Platform.OS === "android") {
          // For Android
          const contentUri = await FileSystem.getContentUriAsync(uri);
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: contentUri,
            flags: 1,
            type: "application/pdf",
          });
        } else {
          // For iOS
          Sharing.shareAsync(uri, { dialogTitle: "Open with or Share" });
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error generating PDF:", error);
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

  function renderLittleIsland() {
    return (
      <View>
        <View style={styles.topPart}>
          <View
            style={{
              height: 56,
              width: 4,
              backgroundColor: "#ed2a2b",
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.headings}>Route 210</Text>
            <Text style={styles.headings}>Little Island To Hollyhill</Text>
          </View>
          <View style={styles.dayContainer}>
            <Text style={styles.dateStyle}>Mon - Fri</Text>
          </View>
        </View>
        <CustomButton
          label1="Little Island To Hollyhill"
          label2="Hollyhill To Little Island"
          activeButton={activeButton}
          onPress={handleButtonPress}
          marginB={20}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.4 }}>
            <ScrollView>
              {litf.map((stop, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderBottomWidth: 1,
                      borderTopWidth: index === 0 ? 1 : 0,
                      backgroundColor: "#D4D4D4",
                      height: cellHeight,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <TouchableOpacity>
                      <Text style={{ padding: 2, borderBottomWidth: 0 }}>
                        {stop.stop_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex: 0.6 }}>
            <ScrollView horizontal={true}>
              <ScrollView>
                {litf.map((stop, index) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderTopWidth: index === 0 ? 1 : 0,
                        height: cellHeight,
                        borderRightWidth: 1,
                      }}
                      key={index}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {stop.times.map((time, i) => (
                          <View
                            key={i}
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              borderLeftWidth: i === 0 ? 0 : 1,
                              height: cellHeight,
                              minWidth: cellWidth,
                              width: cellWidth,
                              maxWidth: cellWidth,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                padding: 5,
                                color: "black",
                                fontWeight: "400",
                                marginRight: 10,
                              }}
                            >
                              {time}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  function renderCobhCorkRoute() {
    return (
      <View>
        <View style={styles.topPart}>
          <View
            style={{
              height: 56,
              width: 4,
              backgroundColor: "#ed2a2b",
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.headings}>Route 200</Text>
            <Text style={styles.headings}>Cobh - Cork Route 200</Text>
          </View>
          <View style={styles.dayContainer}>
            <Text style={styles.dateStyle}>{activeDay}</Text>
          </View>
        </View>
        <CustomButton
          label1="Cobh to Cork"
          label2="Cork to Cobh"
          activeButton={activeButton2}
          onPress={handleButtonPress2}
        />

        <View style={styles.constantsValue}>
          {constants.days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                {
                  backgroundColor: activeDay === day.name ? "#000000" : "white",
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
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 2 }}>
          <View style={{ flex: 0.4 }}>
            <ScrollView>
              {ccr.map((stop, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderBottomWidth: 1,
                      borderTopWidth: index === 0 ? 1 : 0,
                      height: cellHeight,
                      backgroundColor: "#D4D4D4",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <TouchableOpacity>
                      <Text style={{ padding: 2, borderBottomWidth: 0 }}>
                        {stop.stopName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex: 0.6 }}>
            <ScrollView horizontal={true}>
              <ScrollView>
                {ccr.map((stop, index) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderTopWidth: index === 0 ? 1 : 0,
                        height: cellHeight,
                        borderRightWidth: 1,
                        minWidth: cellWidth,
                      }}
                      key={index}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {stop.times.map((time, i) => (
                          <View
                            key={i}
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              borderLeftWidth: i === 0 ? 0 : 1,
                              height: cellHeight,
                              minWidth: time.length > 5 ? 200 : cellWidth,
                              width: time.length > 5 ? 200 : cellWidth,
                              maxWidth: time.length > 5 ? 200 : cellWidth,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                padding: 5,
                                color: "black",
                                fontWeight: "400",
                                marginRight: 10,
                                textAlign: "justify",
                              }}
                            >
                              {time}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  function renderCobhCarrigtwohillLittleIsland() {
    return (
      <View>
        <View style={styles.topPart}>
          <View
            style={{
              height: 56,
              width: 4,
              backgroundColor: "#ed2a2b",
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.headings}>Route 211</Text>
            <Text style={styles.headings}>
              Cobh - Carrigtwohill - Little Island
            </Text>
          </View>
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
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.4 }}>
            <ScrollView>
              {ccli.map((stop, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderBottomWidth: 1,
                      borderTopWidth: index === 0 ? 1 : 0,
                      backgroundColor: "#D4D4D4",
                      height: cellHeight,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <TouchableOpacity>
                      <Text style={{ padding: 2, borderBottomWidth: 0 }}>
                        {stop.stop_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex: 0.6 }}>
            <ScrollView horizontal={true}>
              <ScrollView>
                {ccli.map((stop, index) => {
                  return (
                    <View
                      style={{
                        flex: 1,

                        borderBottomWidth: 1,
                        borderTopWidth: index === 0 ? 1 : 0,
                        borderRightWidth: 1,
                        height: cellHeight,
                      }}
                      key={index}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {stop.times.map((time, i) => (
                          <View
                            key={i}
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              borderLeftWidth: i === 0 ? 0 : 1,
                              height: cellHeight,
                              minWidth: cellWidth,
                              width: cellWidth,
                              maxWidth: cellWidth,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                padding: 5,
                                color: "black",
                                fontWeight: "400",
                                marginRight: 10,
                              }}
                            >
                              {time}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </ScrollView>
          </View>
        </View>
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
      <View style={styles.contentBox}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.insideContentBox}
        >
          {selectedOption === "Little Island" && renderLittleIsland()}
          {selectedOption === "Cobh - Cork Route 200" && renderCobhCorkRoute()}
          {selectedOption === "Cobh - Carrigtwohill - Little Island" &&
            renderCobhCarrigtwohillLittleIsland()}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={generatePDF}
          style={styles.pdfButton}
        >
          {loading ? (
            <Text style={styles.textStyles}>{downloadProgress}%</Text>
          ) : (
            <Text style={styles.textStyles}>Download Timetable PDF</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.optionBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.buttonStyle,
            selectedOption === "Little Island" && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress("Little Island")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === "Little Island" && styles.selectedText,
            ]}
          >
            Little Island To Hollyhill
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.buttonStyle,
            selectedOption === "Cobh - Cork Route 200" && styles.selectedButton,
          ]}
          onPress={() => handleOptionPress("Cobh - Cork Route 200")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === "Cobh - Cork Route 200" && styles.selectedText,
            ]}
          >
            Cobh - Cork Route 200
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.buttonStyle,
            selectedOption === "Cobh - Carrigtwohill - Little Island" &&
              styles.selectedButton,
          ]}
          onPress={() =>
            handleOptionPress("Cobh - Carrigtwohill - Little Island")
          }
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === "Cobh - Carrigtwohill - Little Island" &&
                styles.selectedText,
            ]}
          >
            Cobh - Carrigtwohill - Little Island
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ed2a2b",
  },
  iconStyle: {
    width: 12,
    height: 12,
  },
  constantsValue: {
    height: 49,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stopNameText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#ffffff",
  },
  dateStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  pdfButton: {
    width: 315,
    height: 54,
    backgroundColor: "#000000",
    borderRadius: 9,
    alignSelf: "center",
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyles: {
    fontWeight: "500",
    fontSize: 16,
    color: "#ffffff",
  },

  stopNameContainer: {
    width: 315,
    height: 46,
    backgroundColor: "#ed2a2b",
    borderRadius: 9,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  dayContainer: {
    width: 95,
    height: 23,
    backgroundColor: "#ed2a2b",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  contentBox: {
    marginTop: 50,
    backgroundColor: "#f6f6f6",
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  headings: {
    fontSize: 16,
    color: "#000000",
  },
  insideContentBox: {
    // width: 341,
    marginHorizontal: 24,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    marginTop: 55,
    borderRadius: 9,
    marginBottom: 10,
  },
  topPart: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  optionBar: {
    width: 341,
    height: 59,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: "14%",
    borderRadius: 9,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 7,
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
    fontSize: 23,
    color: "#ffffff",
    fontWeight: "bold",
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
    backgroundColor: "#ed2a2b",
    color: "#eee",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9,
    marginTop: 12,
    marginHorizontal: 12,
  },
  accordTitle: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "#ffffff",
    paddingRight: 15,
  },
  accordBody: {
    padding: 12,
    backgroundColor: "#fdeaea",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    marginHorizontal: 12,
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
    borderRadius: 9,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  timeStyle: {
    fontSize: 16,
    paddingTop: 5,
    color: "black",
    fontWeight: "400",
    marginRight: 10,
  },
  buttonStyle: {
    width: 106,
    height: 44,
    borderRadius: 7,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  buttonText: {
    color: "black",
    fontSize: 11.26,
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#000000",
  },
  selectedText: {
    color: "#ffffff",
  },
});

export default TimetableScreen;
