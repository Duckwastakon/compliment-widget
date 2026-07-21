import { Directory, File, Paths } from "expo-file-system";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { globalStyles, SelectedTheme } from "@/globals/Global";
import {
  createNewFile,
  deleteFile,
  getAllFiles,
  getFile,
  readFile,
  saveFile,
  saveFileToDevice,
} from "@/globals/fileController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sqliteStorage from "expo-sqlite/kv-store";
import { SafeAreaView } from "react-native-safe-area-context";
export const ACTIVE_FILE_KEY = "ACTIVEFILES";

const Customization = () => {
  const listDir = new Directory(Paths.document, "lists");
  listDir.create({ idempotent: true });

  const { theme } = useContext(SelectedTheme);

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
      const checkSwitch = async () => {
        const currentActive = await AsyncStorage.getItem("activeFiles");
        if (currentActive !== null) {
          if (currentActive.includes(fileName)) {
            changeValue(true);
          }
        }
      };

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
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              {fileName}
            </Text>
          </Pressable>
        </View>
        <View style={globalStyles.activeSlider}>
          <Switch onChange={toggleSwitch} value={active} />
        </View>
        {fileName !== "Main.json" ? (
          <View style={globalStyles.deleteFileTextContainer}>
            <Pressable
              onPress={() => {
                deleteFile(listDir, fileName);
                loadFiles();
              }}
            >
              <Text
                style={[
                  globalStyles.deleteText,
                  { color: theme.specialTextColor },
                ]}
              >
                Delete list
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={globalStyles.deleteFileTextContainer}>
            <Pressable
              onPress={() => {
                deleteFile(listDir, fileName);
                loadFiles();
              }}
            >
              <Text
                style={[
                  globalStyles.deleteText,
                  { color: theme.specialTextColor },
                ]}
              >
                Delete list
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  type stringMusts = { comp: string };
  const StringText = ({ comp }: stringMusts) => (
    <View style={globalStyles.inLineText}>
      <View style={globalStyles.fileNameContainer}>
        <Text style={[globalStyles.text, { color: theme.textColor }]}>
          {comp}
        </Text>
      </View>
      <View style={globalStyles.deleteFileTextContainer}>
        <Pressable
          onPress={() => {
            updateComplimentList(compliments.filter((c) => c !== comp));
          }}
        >
          <Text
            style={[globalStyles.deleteText, { color: theme.specialTextColor }]}
          >
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      {!viewing ? (
        <>
          <View style={globalStyles.headerInfoContainer}>
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              Customization page
            </Text>
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              click on a list to edit it
            </Text>
          </View>
          <FlatList
            style={[
              globalStyles.listContainer,
              {
                backgroundColor: theme.deepBackgroundColor,
                borderColor: theme.outlineColor,
              },
            ]}
            data={listFiles}
            renderItem={({ item }) => <FileText fileName={item.name} />}
          />
          <View style={globalStyles.mainInsertContainer}>
            <TextInput
              style={[globalStyles.text, { color: theme.textColor }]}
              placeholder="Enter new file name"
              placeholderTextColor={theme.textColor}
              value={currentFile}
              onChangeText={(txt) => {
                updatecurrentFile(txt);
                console.log(currentFile);
              }}
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
              <Text
                style={[globalStyles.text, { color: theme.specialTextColor }]}
              >
                Create new list
              </Text>
            </Pressable>
          </View>
          <View style={globalStyles.buttonContainer}>
            <Pressable
              onPress={() => {
                getFile();
              }}
              style={globalStyles.selectFileButton}
            >
              <Text
                style={[globalStyles.text, { color: theme.specialTextColor }]}
              >
                select from files
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={globalStyles.headerInfoContainer}>
            <Text style={[globalStyles.text, { color: theme.textColor }]}>
              {currentFile}
            </Text>
            <Pressable
              onPress={() => {
                exitFile(currentFile);
              }}
            >
              <Text
                style={[
                  globalStyles.deleteText,
                  { color: theme.specialTextColor },
                ]}
              >
                Save and exit
              </Text>
            </Pressable>
          </View>

          <FlatList
            style={[
              globalStyles.listContainer,
              {
                backgroundColor: theme.deepBackgroundColor,
                borderColor: theme.outlineColor,
              },
            ]}
            data={compliments}
            renderItem={({ item }) => <StringText comp={item} />}
          />
          <View style={globalStyles.mainInsertContainer}>
            <TextInput
              style={[globalStyles.text, { color: theme.textColor }]}
              placeholder="Enter compliment"
              placeholderTextColor={theme.textColor}
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
              <Text
                style={[globalStyles.text, { color: theme.specialTextColor }]}
              >
                add compliment
              </Text>
            </Pressable>
          </View>

          <View style={globalStyles.buttonContainer}>
            <Pressable
              onPress={() => {
                console.log(currentFile);
                saveFileToDevice(listDir, currentFile);
              }}
              style={globalStyles.shareFileButton}
            >
              <Text
                style={[globalStyles.text, { color: theme.specialTextColor }]}
              >
                share file
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log("clicked");
              }}
              style={globalStyles.massInsertButton}
            >
              <Text
                style={[globalStyles.text, { color: theme.specialTextColor }]}
              >
                WIP
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Customization;
