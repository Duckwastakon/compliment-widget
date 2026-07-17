import { globalStyles, SelectedTheme } from "@/globals/Global";
import { Pressable, Text, View } from "react-native";

import {
  getNewCompliment,
  setNewTime,
  timeToString,
} from "@/globals/dataController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";

export default function Index() {
  const [generatedString, updateString] = useState("");
  const [seconds, updateSeconds] = useState("xx");
  const [minutes, updateMinutes] = useState("xx");
  const [hours, updateHours] = useState("xx");

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

  useEffect(() => {
    checkPassedTime();

    updateTimer();

    const interval = setInterval(() => {
      updateTimer();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <Text style={[globalStyles.title, { color: theme.textColor }]}>
        Main page
      </Text>
      <View
        style={[
          globalStyles.complimentContainer,
          { backgroundColor: theme.deepBackgroundColor },
        ]}
      >
        <Text style={[globalStyles.complimentText, { color: theme.textColor }]}>
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
  );
}
