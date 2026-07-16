import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";
import sqliteStorage from "expo-sqlite/kv-store";

export const LAST_STRING_KEY = "Widget:String";
export const LAST_THEME_KEY = "Widget:Theme";
export const TIME_LEFT_KEY = "Widget:Time";
export const ACTIVE_FILE_KEY = "ACTIVEFILES";

export const getNewCompliment = () => {
  const chosenFiles = sqliteStorage.getItemSync(ACTIVE_FILE_KEY);

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
  const lastString = sqliteStorage.getItemSync(LAST_STRING_KEY);
  let newString = content[Math.floor(Math.random() * content.length)];
  while (newString === lastString && content.length > 1) {
    newString = content[Math.floor(Math.random() * content.length)];
  }

  sqliteStorage.setItemSync(LAST_STRING_KEY, newString);
  sqliteStorage.setItemSync(
    TIME_LEFT_KEY,
    (Date.now() + 60 * 1000 * 60 * 24).toString(),
  );

  setAsyncs(newString);

  return newString;
};

async function setAsyncs(newString: string) {
  await AsyncStorage.setItem("lastString", newString);
  await AsyncStorage.setItem(
    "nextUpdateTime",
    (Date.now() + 60 * 1000 * 60 * 24).toString(),
  );
}

export const getNewComplimentasync = async () => {
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

  return newString;
};

export const setNewTime = async () => {
  await AsyncStorage.setItem(
    "nextUpdateTime",
    (Date.now() + 60 * 1000 * 60 * 24).toString(),
  );
};

export const timeToString = (time: number) => {
  let hours = Math.floor(time / 1000 / 60 / 60);
  let minutes = Math.floor(time / 1000 / 60 - hours * 60);
  let seconds = Math.floor(time / 1000 - minutes * 60 - hours * 60 * 60);

  let hourString = "0" + hours.toString();
  let minuteString = "0" + minutes.toString();
  let secondString = "0" + seconds.toString();

  return { hourString, minuteString, secondString };
};
