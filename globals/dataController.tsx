import AsyncStorage from "@react-native-async-storage/async-storage";
import { Directory, File, Paths } from "expo-file-system";
import sqliteStorage from "expo-sqlite/kv-store";

export const LAST_STRING_KEY = "Widget:String";
export const LAST_THEME_KEY = "Widget:Theme";
export const TIME_LEFT_KEY = "Widget:Time";
export const ACTIVE_FILE_KEY = "ACTIVEFILES";
export const EXTRA_TIME_KEY = "KEYNEEDTIME";
export const CLICK_TO_SKIP_KEY = "Widget:Skip";

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

  const extraTime =
    Number(sqliteStorage.getItemSync(EXTRA_TIME_KEY)) || 60 * 1000 * 60 * 24;

  sqliteStorage.setItemSync(LAST_STRING_KEY, newString);
  sqliteStorage.setItemSync(TIME_LEFT_KEY, (Date.now() + extraTime).toString());

  setAsyncs(newString);

  return newString;
};

async function setAsyncs(newString: string) {
  const extraTime =
    Number(sqliteStorage.getItemSync(EXTRA_TIME_KEY)) || 60 * 1000 * 60 * 24;
  await AsyncStorage.setItem("lastString", newString);
  await AsyncStorage.setItem(
    "nextUpdateTime",
    (Date.now() + extraTime).toString(),
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

  const extraTime =
    Number(sqliteStorage.getItemSync(EXTRA_TIME_KEY)) || 60 * 1000 * 60 * 24;

  await AsyncStorage.setItem("lastString", newString);
  await AsyncStorage.setItem(
    "nextUpdateTime",
    (Date.now() + extraTime).toString(),
  );

  return newString;
};

export const setNewTime = async () => {
  const extraTime =
    Number(sqliteStorage.getItemSync(EXTRA_TIME_KEY)) || 60 * 1000 * 60 * 24;

  await AsyncStorage.setItem(
    "nextUpdateTime",
    (Date.now() + extraTime).toString(),
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

export const setNewTheme = (newTheme: string) => {
  sqliteStorage.setItemSync(LAST_THEME_KEY, newTheme);
};

export function getCurrentTheme() {
  return sqliteStorage.getItemSync(LAST_THEME_KEY);
}
export const loadCurrentTheme = () => {
  return sqliteStorage.getItemSync(LAST_THEME_KEY) || "purple";
};
export const setTimeValue = (value: string) => {
  sqliteStorage.setItemSync(EXTRA_TIME_KEY, value);
};
export const getExtraTimeValue = () => {
  return sqliteStorage.getItemSync(EXTRA_TIME_KEY);
};
export const getTimeUnits = () => {
  const fullTime = Number(sqliteStorage.getItemSync(EXTRA_TIME_KEY)) / 1000;
  const secondTime = (fullTime % (60 * 60)) % 60;
  const minutesTime = (fullTime - secondTime) % (60 * 60);
  const hourTime = fullTime - minutesTime - secondTime;

  let hourString = "0" + (hourTime / (60 * 60)).toString();
  let minuteString = "0" + (minutesTime / 60).toString();
  let secondsString = "0" + secondTime.toString();

  return {
    h: hourString.substring(hourString.length - 2, hourString.length),
    m: minuteString.substring(minuteString.length - 2, minuteString.length),
    s: secondsString.substring(secondsString.length - 2, secondsString.length),
  };
};

export const setSkipOnClick = (val: boolean) => {
  if (val) {
    sqliteStorage.setItemSync(CLICK_TO_SKIP_KEY, "1");
  } else {
    sqliteStorage.setItemSync(CLICK_TO_SKIP_KEY, "0");
  }
};

export const getSkipOnClick = () => {
  if (sqliteStorage.getItemSync(CLICK_TO_SKIP_KEY) === "1") {
    return true;
  } else {
    return false;
  }
};
