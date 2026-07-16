import { globalStyles } from "@/globals/Global";
import { Pressable, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";

export default function Index() {
  const [generatedString, updateString] = useState("");
  const [seconds, updateSeconds] = useState("xx");
  const [minutes, updateMinutes] = useState("xx");
  const [hours, updateHours] = useState("xx");

  const generateString = async () => {
    const chosenFiles = await AsyncStorage.getItem("activeFiles");

    let chosenFile;

    const dir = new Directory(Paths.document, "lists");
    dir.create({ idempotent: true });

    if (chosenFiles === null) {
      chosenFile = "Main.json";
    } else {
      const allFiles = JSON.parse(chosenFiles);
      if (allFiles.length === 0) {
        chosenFile = "Main.json";
      } else {
        chosenFile = allFiles[Math.floor(Math.random() * allFiles.length)];
      }
    }

    const file = new File(dir, chosenFile);

    const content = JSON.parse(file.textSync());
    const lastString = await AsyncStorage.getItem("lastString");
    let newString = content[Math.floor(Math.random() * content.length)];
    while (newString === lastString && content.length > 1) {
      newString = content[Math.floor(Math.random() * content.length)];
    }

    await AsyncStorage.setItem("lastString", newString);
    await AsyncStorage.setItem(
      "nextUpdateTime",
      (Date.now() + 60 * 1000 * 60 * 24).toString(),
    );

    updateString(newString);
  };

  const checkPassedTime = async () => {
    const pastString = await AsyncStorage.getItem("lastString");

    if (pastString) {
      updateString(pastString);
    }

    const savedTime = await AsyncStorage.getItem("nextUpdateTime");

    if (!savedTime) {
      await AsyncStorage.setItem(
        "nextUpdateTime",
        (Date.now() + 60 * 1000 * 60 * 24).toString(),
      );
      generateString();
    } else {
      if (Date.now() > Number(savedTime)) {
        console.log("timed compliment");
        await AsyncStorage.setItem(
          "nextUpdateTime",
          (Date.now() + 60 * 1000 * 60 * 24).toString(),
        );
        generateString();
      }
    }
  };

  const updateTimer = async () => {
    const savedTime = await AsyncStorage.getItem("nextUpdateTime");
    let timeLeft = Number(savedTime) - Date.now();

    if (timeLeft < 0) {
      await AsyncStorage.setItem(
        "nextUpdateTime",
        (Date.now() + 60 * 1000 * 60 * 24).toString(),
      );
      generateString();
      return;
    }

    let hours = Math.floor(timeLeft / 1000 / 60 / 60);
    let minutes = Math.floor(timeLeft / 1000 / 60 - hours * 60);
    let seconds = Math.floor(timeLeft / 1000 - minutes * 60 - hours * 60 * 60);

    let hourString = "0" + hours.toString();
    let minuteString = "0" + minutes.toString();
    let secondString = "0" + seconds.toString();
    updateHours(hourString.substring(hourString.length - 2, hourString.length));
    updateMinutes(
      minuteString.substring(minuteString.length - 2, minuteString.length),
    );
    updateSeconds(
      secondString.substring(secondString.length - 2, secondString.length),
    );

    //console.log(
    //  hours.toString() + ":" + minutes.toString() + ":" + seconds.toString(),
    //);
  };

  useEffect(() => {
    checkPassedTime();

    const interval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Main page</Text>
      <View style={globalStyles.complimentContainer}>
        <Text style={globalStyles.complimentText}>{generatedString}</Text>
      </View>
      <Text style={globalStyles.text}>
        next compliment in {hours}:{minutes}:{seconds}
      </Text>
      <Pressable onPress={generateString}>
        <Text style={globalStyles.text}>Skip timer</Text>
      </Pressable>
    </View>
  );
}
