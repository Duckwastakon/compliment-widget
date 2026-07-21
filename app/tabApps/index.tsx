import { indexStyles, SelectedTheme } from "@/globals/Global";
import { Text, TouchableHighlight, View } from "react-native";

import {
  getNewCompliment,
  getSkipOnClick,
  getTimeUnits,
  setNewTime,
  setSkipOnClick,
  setTimeValue,
  timeToString,
} from "@/globals/dataController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [generatedString, updateString] = useState("");
  const [seconds, updateSeconds] = useState("xx");
  const [minutes, updateMinutes] = useState("xx");
  const [hours, updateHours] = useState("xx");

  const { h, m, s } = getTimeUnits();

  const [setHours, updateSetHours] = useState(h);
  const [setMinutes, updateSetMinutes] = useState(m);
  const [setSeconds, updateSetSeconds] = useState(s);

  const [checked, setChecked] = useState(getSkipOnClick());

  const { theme } = useContext(SelectedTheme);

  const generateString = async () => {
    updateString(await getNewCompliment());
  };

  const checkPassedTime = async () => {
    const pastString = await AsyncStorage.getItem("lastString");

    if (pastString) {
      updateString(pastString);
    }

    const savedTime = await AsyncStorage.getItem("nextUpdateTime");

    if (!savedTime) {
      setNewTime();
      generateString();
    } else {
      if (Date.now() > Number(savedTime)) {
        console.log("timed compliment");
        setNewTime();
        generateString();
      }
    }
  };

  const updateTimer = async () => {
    const savedTime = await AsyncStorage.getItem("nextUpdateTime");
    let timeLeft = Number(savedTime) - Date.now();

    if (timeLeft < 0) {
      setNewTime();
      generateString();
      return;
    }

    const { hourString, minuteString, secondString } = timeToString(timeLeft);
    updateHours(hourString.substring(hourString.length - 2, hourString.length));
    updateMinutes(
      minuteString.substring(minuteString.length - 2, minuteString.length),
    );
    updateSeconds(
      secondString.substring(secondString.length - 2, secondString.length),
    );
  };

  function changeSeconds(amount: number) {
    let newNumb: number = Number(setSeconds) + amount;
    if (newNumb > 59) {
      changeMinutes(1);
      newNumb = 0;
    }

    if (newNumb < 0) {
      changeMinutes(-1);
      newNumb = 59;
    }
    const newString = "0" + newNumb.toString();
    updateSetSeconds(
      newString.substring(newString.length - 2, newString.length),
    );
  }

  function changeMinutes(amount: number) {
    let newNumb: number = Number(setMinutes) + amount;
    if (newNumb > 59) {
      changeHours(1);
      newNumb = 0;
    }

    if (newNumb < 0) {
      changeHours(-1);
      newNumb = 59;
    }
    const newString = "0" + newNumb.toString();
    updateSetMinutes(
      newString.substring(newString.length - 2, newString.length),
    );
  }

  function changeHours(amount: number) {
    let newNumb: number = Number(setHours) + amount;
    if (newNumb > 72) {
      newNumb = 0;
    }

    if (newNumb < 0) {
      newNumb = 72;
    }

    const newString = "0" + newNumb.toString();
    updateSetHours(newString.substring(newString.length - 2, newString.length));
  }

  useEffect(() => {
    checkPassedTime();

    updateTimer();

    const interval = setInterval(() => {
      updateTimer();
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <SafeAreaView
      style={[indexStyles.container, { backgroundColor: theme.primaryColor }]}
    >
      <View style={indexStyles.mainIndexContainer}>
        <Text style={[indexStyles.thanksText, { color: theme.textColor }]}>
          Thank you for trying compliment widget, configure the app and enjoy!
        </Text>
        <View
          style={[
            indexStyles.currentComplimentContainer,
            { backgroundColor: theme.secondaryColor },
          ]}
        >
          <Text
            style={[indexStyles.complimentText, { color: theme.textColor }]}
          >
            {generatedString}
          </Text>
        </View>
        <Text style={[indexStyles.timerText, { color: theme.accentColor }]}>
          next compliment in {hours}:{minutes}:{seconds}
        </Text>
        <TouchableHighlight
          style={[
            indexStyles.skipTimerButton,
            { backgroundColor: theme.buttonMainColor },
          ]}
          activeOpacity={0.6}
          underlayColor={theme.buttonMainClickedColor}
          onPress={generateString}
        >
          <Text
            style={[
              indexStyles.skipTimerText,
              { color: theme.buttonTextColor },
            ]}
          >
            Skip timer
          </Text>
        </TouchableHighlight>
        <View style={indexStyles.settingContainer}>
          <Text
            style={[indexStyles.extraSettingTitle, { color: theme.textColor }]}
          >
            Main settings
          </Text>
          <Text style={[indexStyles.settingText, { color: theme.accentColor }]}>
            Change time between compliments
          </Text>
          <View style={indexStyles.digitContainer}>
            <View style={[indexStyles.singleDigitContainer]}>
              <Text style={[indexStyles.digitText, { color: theme.textColor }]}>
                Hours
              </Text>
              <View style={indexStyles.changeDigitContainer}>
                <TouchableHighlight
                  style={[
                    indexStyles.changeButton,
                    { backgroundColor: theme.buttonSecondaryColor },
                  ]}
                  underlayColor={theme.buttonSecondaryClickedColor}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeHours(1);
                  }}
                >
                  <Text
                    style={[
                      indexStyles.plusMinusText,
                      { color: theme.textColor },
                    ]}
                  >
                    +
                  </Text>
                </TouchableHighlight>
                <Text
                  style={[
                    indexStyles.plusMinusText,
                    { color: theme.textColor },
                  ]}
                >
                  {setHours}
                </Text>
                <TouchableHighlight
                  style={[
                    indexStyles.changeButton,
                    { backgroundColor: theme.buttonSecondaryColor },
                  ]}
                  underlayColor={theme.buttonSecondaryClickedColor}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeHours(-1);
                  }}
                >
                  <Text
                    style={[
                      indexStyles.plusMinusText,
                      { color: theme.textColor },
                    ]}
                  >
                    -
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={[indexStyles.singleDigitContainer]}>
              <Text style={[indexStyles.digitText, { color: theme.textColor }]}>
                Minutes
              </Text>
              <View style={indexStyles.changeDigitContainer}>
                <TouchableHighlight
                  style={[
                    indexStyles.changeButton,
                    { backgroundColor: theme.buttonSecondaryColor },
                  ]}
                  underlayColor={theme.buttonSecondaryClickedColor}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeMinutes(1);
                  }}
                >
                  <Text
                    style={[
                      indexStyles.plusMinusText,
                      { color: theme.textColor },
                    ]}
                  >
                    +
                  </Text>
                </TouchableHighlight>
                <Text
                  style={[
                    indexStyles.plusMinusText,
                    { color: theme.textColor },
                  ]}
                >
                  {setMinutes}
                </Text>
                <TouchableHighlight
                  style={[
                    indexStyles.changeButton,
                    { backgroundColor: theme.buttonSecondaryColor },
                  ]}
                  underlayColor={theme.buttonSecondaryClickedColor}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeMinutes(-1);
                  }}
                >
                  <Text
                    style={[
                      indexStyles.plusMinusText,
                      { color: theme.textColor },
                    ]}
                  >
                    -
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={[indexStyles.singleDigitContainer]}>
              <Text style={[indexStyles.digitText, { color: theme.textColor }]}>
                Seconds
              </Text>
              <View style={indexStyles.changeDigitContainer}>
                <TouchableHighlight
                  style={[
                    indexStyles.changeButton,
                    { backgroundColor: theme.buttonSecondaryColor },
                  ]}
                  underlayColor={theme.buttonSecondaryClickedColor}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeSeconds(1);
                  }}
                >
                  <Text
                    style={[
                      indexStyles.plusMinusText,
                      { color: theme.textColor },
                    ]}
                  >
                    +
                  </Text>
                </TouchableHighlight>
                <Text
                  style={[
                    indexStyles.plusMinusText,
                    { color: theme.textColor },
                  ]}
                >
                  {setSeconds}
                </Text>
                <TouchableHighlight
                  style={[
                    indexStyles.changeButton,
                    { backgroundColor: theme.buttonSecondaryColor },
                  ]}
                  underlayColor={theme.buttonSecondaryClickedColor}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeSeconds(-1);
                  }}
                >
                  <Text
                    style={[
                      indexStyles.plusMinusText,
                      { color: theme.textColor },
                    ]}
                  >
                    -
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <TouchableHighlight
            style={[
              indexStyles.updateButton,
              { backgroundColor: theme.buttonMainColor },
            ]}
            activeOpacity={0.6}
            underlayColor={theme.buttonMainClickedColor}
            onPress={() => {
              const newTimeVal =
                1000 * Number(setSeconds) +
                1000 * 60 * Number(setMinutes) +
                1000 * 60 * 60 * Number(setHours);
              setTimeValue(newTimeVal.toString());
            }}
          >
            <Text
              style={[
                indexStyles.updateButtonText,
                { color: theme.buttonTextColor },
              ]}
            >
              set new compliment delay
            </Text>
          </TouchableHighlight>
          <Text style={[indexStyles.warningText, { color: theme.textColor }]}>
            Warning! android widgets update every 30 minutes
          </Text>
          <Text style={[indexStyles.settingText, { color: theme.accentColor }]}>
            Allow widget to skip timer when clicked
          </Text>

          <View style={indexStyles.checkBoxContainer}>
            <Checkbox
              value={checked}
              color={checked ? theme.buttonSecondaryColor : undefined}
              onValueChange={(newVal) => {
                setChecked(newVal);
                setSkipOnClick(newVal);
              }}
            />
            <Text
              style={[indexStyles.checkBoxText, { color: theme.accentColor }]}
            >
              Click on widget to skip timer
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
