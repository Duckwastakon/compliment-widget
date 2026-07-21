import { globalStyles, SelectedTheme } from "@/globals/Global";
import { Pressable, Text, View } from "react-native";

import {
  getNewCompliment,
  getTimeUnits,
  setNewTime,
  setTimeValue,
  timeToString,
} from "@/globals/dataController";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      style={[
        globalStyles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <View style={globalStyles.mainIndexContainer}>
        <Text style={[globalStyles.title, { color: theme.textColor }]}>
          Main page
        </Text>
        <View
          style={[
            globalStyles.complimentContainer,
            { backgroundColor: theme.deepBackgroundColor },
          ]}
        >
          <Text
            style={[globalStyles.complimentText, { color: theme.textColor }]}
          >
            {generatedString}
          </Text>
        </View>
        <Text style={[globalStyles.text, { color: theme.textColor }]}>
          next compliment in {hours}:{minutes}:{seconds}
        </Text>
        <Pressable style={globalStyles.skipTimer} onPress={generateString}>
          <Text style={[globalStyles.text, { color: theme.specialTextColor }]}>
            Skip timer
          </Text>
        </Pressable>
      </View>
      <View style={globalStyles.timerSettingContainer}>
        <Text>Change compliment recieving delay</Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={globalStyles.singleDigitContainer}>
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              Hours
            </Text>
            <View style={globalStyles.increaseDecreaseContainer}>
              <Pressable
                style={globalStyles.changeButtonDesign}
                onPress={() => {
                  changeHours(1);
                }}
              >
                <Text style={[globalStyles.text, { color: theme.textColor }]}>
                  +
                </Text>
              </Pressable>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.singleDigitText,
                  { color: theme.textColor },
                ]}
              >
                {setHours}
              </Text>
              <Pressable
                style={globalStyles.changeButtonDesign}
                onPress={() => {
                  changeHours(-1);
                }}
              >
                <Text style={[globalStyles.text, { color: theme.textColor }]}>
                  -
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={globalStyles.singleDigitContainer}>
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              Minutes
            </Text>
            <View style={globalStyles.increaseDecreaseContainer}>
              <Pressable
                style={globalStyles.changeButtonDesign}
                onPress={() => {
                  changeMinutes(1);
                }}
              >
                <Text style={[globalStyles.text, { color: theme.textColor }]}>
                  +
                </Text>
              </Pressable>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.singleDigitText,
                  { color: theme.textColor },
                ]}
              >
                {setMinutes}
              </Text>
              <Pressable
                style={globalStyles.changeButtonDesign}
                onPress={() => {
                  changeMinutes(-1);
                }}
              >
                <Text style={[globalStyles.text, { color: theme.textColor }]}>
                  -
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={globalStyles.singleDigitContainer}>
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              Seconds
            </Text>
            <View style={globalStyles.increaseDecreaseContainer}>
              <Pressable
                style={globalStyles.changeButtonDesign}
                onPress={() => {
                  changeSeconds(1);
                }}
              >
                <Text style={[globalStyles.text, { color: theme.textColor }]}>
                  +
                </Text>
              </Pressable>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.singleDigitText,
                  { color: theme.textColor },
                ]}
              >
                {setSeconds}
              </Text>
              <Pressable
                style={globalStyles.changeButtonDesign}
                onPress={() => {
                  changeSeconds(-1);
                }}
              >
                <Text style={[globalStyles.text, { color: theme.textColor }]}>
                  -
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            const newTimeVal =
              1000 * Number(setSeconds) +
              1000 * 60 * Number(setMinutes) +
              1000 * 60 * 60 * Number(setHours);
            setTimeValue(newTimeVal.toString());
          }}
        >
          <Text>set new compliment delay</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
