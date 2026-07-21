import { Directory, File, Paths } from "expo-file-system";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { listStyles, SelectedTheme } from "@/globals/Global";
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
import { Checkbox } from "expo-checkbox";
import { Image } from "expo-image";
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

    const toggleCheckBox = async () => {
      changeValue(true);

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
      <View
        style={[
          listStyles.inLineText,
          { backgroundColor: theme.secondaryColor },
        ]}
      >
        <View style={listStyles.fileNameContainer}>
          <Pressable
            onPress={() => {
              openFile(fileName);
            }}
          >
            <Text style={[listStyles.fileText, { color: theme.textColor }]}>
              {fileName.split(".")[0]}
            </Text>
          </Pressable>
        </View>
        <View style={listStyles.checkBoxContainer}>
          <Checkbox
            onChange={() => {
              console.log("hey");
              toggleCheckBox();
            }}
            value={active}
            color={active ? theme.buttonSecondaryColor : undefined}
          />
        </View>
        {fileName !== "Main.json" ? (
          <View style={listStyles.deleteContainer}>
            <TouchableHighlight
              onPress={() => {
                deleteFile(listDir, fileName);
                loadFiles();
              }}
              activeOpacity={0.15}
            >
              <Image
                style={{ width: 32, height: 32, tintColor: theme.deleteColor }}
                source={require("./garbage.png")}
              />
            </TouchableHighlight>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  type stringMusts = { comp: string };
  const StringText = ({ comp }: stringMusts) => (
    <View
      style={[listStyles.inLineText, { backgroundColor: theme.secondaryColor }]}
    >
      <View style={listStyles.fileNameContainer}>
        <Text style={[listStyles.complimentText, { color: theme.textColor }]}>
          {comp}
        </Text>
      </View>
      <View style={listStyles.deleteContainer}>
        <TouchableHighlight
          onPress={() => {
            updateComplimentList(compliments.filter((c) => c !== comp));
          }}
          activeOpacity={0.15}
        >
          <Image
            style={{ width: 32, height: 32, tintColor: theme.deleteColor }}
            source={require("./garbage.png")}
          />
        </TouchableHighlight>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[listStyles.container, { backgroundColor: theme.primaryColor }]}
    >
      {!viewing ? (
        <>
          <View style={listStyles.headerContainer}>
            <Text style={[listStyles.headerText, { color: theme.textColor }]}>
              Compliment lists
            </Text>
            <Text style={[listStyles.headerInfo, { color: theme.accentColor }]}>
              choose a compliment list to edit
            </Text>
          </View>
          <FlatList
            style={[
              listStyles.listContainer,
              {
                //backgroundColor: theme.secondaryColor,
                borderColor: theme.accentColor,
              },
            ]}
            contentContainerStyle={{ gap: 8 }}
            data={listFiles}
            renderItem={({ item }) => <FileText fileName={item.name} />}
          />
          <TextInput
            style={[
              listStyles.enterText,
              { color: theme.textColor, backgroundColor: theme.secondaryColor },
            ]}
            placeholder="Enter new list name"
            placeholderTextColor={theme.textColor}
            value={currentFile}
            onChangeText={(txt) => {
              updatecurrentFile(txt);
              console.log(currentFile);
            }}
          />
          <TouchableHighlight
            style={[
              listStyles.createButton,
              { backgroundColor: theme.buttonMainColor },
            ]}
            activeOpacity={0.6}
            underlayColor={theme.buttonMainClickedColor}
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
              style={[
                listStyles.createButtonText,
                { color: theme.buttonTextColor },
              ]}
            >
              Create new list
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              getFile();
            }}
            style={[
              listStyles.selectFileButton,
              { backgroundColor: theme.buttonSecondaryColor },
            ]}
            activeOpacity={0.6}
            underlayColor={theme.buttonSecondaryClickedColor}
          >
            <Text
              style={[listStyles.selectFileText, { color: theme.textColor }]}
            >
              Upload a list from files
            </Text>
          </TouchableHighlight>
        </>
      ) : (
        <>
          <View style={listStyles.headerContainer}>
            <Text style={[listStyles.headerText, { color: theme.textColor }]}>
              {currentFile.split(".")[0]}
            </Text>
            <TouchableHighlight
              style={[
                listStyles.saveButton,
                { backgroundColor: theme.buttonSecondaryColor },
              ]}
              onPress={() => {
                exitFile(currentFile);
              }}
              activeOpacity={0.6}
              underlayColor={theme.buttonSecondaryClickedColor}
            >
              <Text
                style={[listStyles.saveText, { color: theme.buttonTextColor }]}
              >
                Save and exit list
              </Text>
            </TouchableHighlight>
          </View>

          <FlatList
            style={[
              listStyles.listContainer,
              {
                //backgroundColor: theme.deepBackgroundColor,
                borderColor: theme.accentColor,
              },
            ]}
            contentContainerStyle={{ gap: 8 }}
            data={compliments}
            renderItem={({ item }) => <StringText comp={item} />}
          />
          <TextInput
            style={[
              listStyles.enterText,
              { color: theme.textColor, backgroundColor: theme.secondaryColor },
            ]}
            placeholder="Type a new compliment"
            placeholderTextColor={theme.textColor}
            onChangeText={updateCompliment}
            value={compliment}
          />
          <TouchableHighlight
            onPress={() => {
              if (compliment !== "") {
                updateComplimentList([...compliments, compliment]);
              }
              updateCompliment("");
            }}
            style={[
              listStyles.createButton,
              { backgroundColor: theme.buttonMainColor },
            ]}
            activeOpacity={0.6}
            underlayColor={theme.buttonMainClickedColor}
          >
            <Text
              style={[
                listStyles.createButtonText,
                { color: theme.buttonTextColor },
              ]}
            >
              Add new compliment
            </Text>
          </TouchableHighlight>

          <View style={listStyles.buttonContainer}>
            <TouchableHighlight
              onPress={() => {
                console.log(currentFile);
                saveFileToDevice(listDir, currentFile);
              }}
              style={[
                listStyles.smallButton,
                { backgroundColor: theme.buttonSecondaryColor },
              ]}
              activeOpacity={0.6}
              underlayColor={theme.buttonSecondaryClickedColor}
            >
              <Text
                style={[listStyles.selectFileText, { color: theme.textColor }]}
              >
                Share selected list
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                console.log("clicked");
              }}
              style={[
                listStyles.smallButton,
                { backgroundColor: theme.buttonSecondaryColor },
              ]}
              activeOpacity={0.6}
              underlayColor={theme.buttonSecondaryClickedColor}
            >
              <Text
                style={[
                  listStyles.selectFileText,
                  { color: theme.specialTextColor },
                ]}
              >
                Paste compliments
              </Text>
            </TouchableHighlight>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Customization;
