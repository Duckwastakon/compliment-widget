import { Directory, File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, globalStyles } from "@/globals/Global";
import {
  createNewFile,
  deleteFile,
  getAllFiles,
  readFile,
  saveFile,
} from "@/globals/fileController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sqliteStorage from "expo-sqlite/kv-store";
export const ACTIVE_FILE_KEY = "ACTIVEFILES";

const Customization = () => {
  const listDir = new Directory(Paths.document, "lists");
  listDir.create({ idempotent: true });

  const [compliment, updateCompliment] = useState("");
  const [compliments, updateComplimentList] = useState<string[]>([]);
  const [currentFile, updatecurrentFile] = useState("");
  const [viewing, updateViewing] = useState(false);
  const [listFiles, updateListFiles] = useState<(Directory | File)[]>([]);

  const loadFiles = async () => {
    const files = getAllFiles(listDir);
    if (files !== undefined) {
      updateListFiles(files);
    }
  };

  const openFile = async (fileName: string) => {
    updatecurrentFile(fileName);
    updateViewing(true);

    updateComplimentList(await readFile(listDir, fileName));
  };

  const exitFile = (fileName: string) => {
    updatecurrentFile("");
    updateViewing(false);

    saveFile(listDir, fileName, JSON.stringify(compliments));
  };

  useEffect(() => {
    loadFiles();
  }, []);

  type fileMusts = { fileName: string };
  const FileText = ({ fileName }: fileMusts) => {
    const [active, changeValue] = useState(false);

    const checkSwitch = async () => {
      const currentActive = await AsyncStorage.getItem("activeFiles");
      if (currentActive !== null) {
        if (currentActive.includes(fileName)) {
          changeValue(true);
        }
      }
    };

    const toggleSwitch = async () => {
      changeValue((previousState) => !previousState);

      let currentList = await AsyncStorage.getItem("activeFiles");
      let newList: string[] = [];

      if (currentList !== null) {
        newList = JSON.parse(currentList);
      }

      if (!active) newList.push(fileName);
      else newList = newList.filter((val) => val !== fileName);

      await AsyncStorage.setItem("activeFiles", JSON.stringify(newList));
      sqliteStorage.setItemAsync(ACTIVE_FILE_KEY, JSON.stringify(newList));
      console.log(newList);
    };

    useEffect(() => {
      console.log("Runs only once");

      checkSwitch();
    }, []);

    return (
      <View style={globalStyles.inLineText}>
        <View style={globalStyles.fileNameContainer}>
          <Pressable
            onPress={() => {
              openFile(fileName);
            }}
          >
            <Text style={globalStyles.text}>{fileName}</Text>
          </Pressable>
        </View>
        <View style={globalStyles.activeSlider}>
          <Switch onChange={toggleSwitch} value={active} />
        </View>
        <View style={globalStyles.deleteFileTextContainer}>
          <Pressable
            onPress={() => {
              deleteFile(listDir, fileName);
              loadFiles();
            }}
          >
            <Text style={globalStyles.deleteText}>Delete list</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  type stringMusts = { comp: string };
  const StringText = ({ comp }: stringMusts) => (
    <View style={globalStyles.inLineText}>
      <View style={globalStyles.fileNameContainer}>
        <Text style={globalStyles.text}>{comp}</Text>
      </View>
      <View style={globalStyles.deleteFileTextContainer}>
        <Pressable
          onPress={() => {
            updateComplimentList(compliments.filter((c) => c !== comp));
          }}
        >
          <Text style={globalStyles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      {!viewing ? (
        <>
          <FlatList
            style={globalStyles.scroll}
            data={listFiles}
            renderItem={({ item }) => <FileText fileName={item.name} />}
          />
          <TextInput
            style={globalStyles.text}
            placeholder="Enter new file name"
            placeholderTextColor={colors.textColor}
            onChangeText={updatecurrentFile}
            value={currentFile}
          />
          <Pressable
            onPress={() => {
              if (currentFile !== "") {
                createNewFile(
                  listDir,
                  currentFile + ".json",
                  JSON.stringify(["congrats on making a new list"]),
                );
                loadFiles();
                updatecurrentFile("");
              }
            }}
          >
            <Text style={globalStyles.text}>Create new list</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={globalStyles.text}>{currentFile}</Text>
          <Pressable
            onPress={() => {
              exitFile(currentFile);
            }}
          >
            <Text style={globalStyles.deleteText}>Save compliment table</Text>
          </Pressable>

          <FlatList
            style={globalStyles.scroll}
            data={compliments}
            renderItem={({ item }) => <StringText comp={item} />}
          />
          <TextInput
            style={globalStyles.text}
            placeholder="Enter compliment"
            placeholderTextColor={colors.textColor}
            onChangeText={updateCompliment}
            value={compliment}
          />
          <Pressable
            onPress={() => {
              if (compliment !== "") {
                updateComplimentList([...compliments, compliment]);
              }
              updateCompliment("");
            }}
          >
            <Text style={globalStyles.text}>add compliment</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default Customization;
