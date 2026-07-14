import { Directory, File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { colors, globalStyles } from "@/globals/Global";

const Customization = () => {
  const listDirectory = new Directory(Paths.document, "lists");
  listDirectory.create({ idempotent: true });

  const [compliment, updateCompliment] = useState("");
  const [compliments, updateComplimentList] = useState<string[]>([]);
  const [currentFile, updatecurrentFile] = useState("");
  const [viewing, updateViewing] = useState(false);
  const [listFiles, updateListFiles] = useState<(Directory | File)[]>([]);

  const loadFiles = async () => {
    try {
      const files = listDirectory.list();

      updateListFiles(files);
    } catch (error) {
      console.error(error);
    }
  };

  const saveFile = async (fileName: string) => {
    try {
      const file = new File(listDirectory, fileName);
      file.write(JSON.stringify(compliments));
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const createNewFile = async (fileName: string) => {
    try {
      const file = new File(listDirectory, fileName + ".json");
      if (file.exists) return;
      file.create();
      file.write(JSON.stringify(["congrats on making a new list"]));
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      const file = new File(listDirectory, fileName);
      file.delete();
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const openList = async (fileName: string) => {
    const file = new File(listDirectory, fileName);
    updatecurrentFile(fileName);
    updateViewing(true);

    updateComplimentList(JSON.parse(file.textSync()));
  };

  const exitComplimentsList = (fileName: string) => {
    updatecurrentFile("");
    updateViewing(false);

    saveFile(fileName);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <View style={globalStyles.container}>
      {!viewing ? (
        <>
          <ScrollView style={globalStyles.scroll}>
            {listFiles.map((list, index) => (
              <View key={index} style={globalStyles.inLineText}>
                <Pressable
                  onPress={() => {
                    openList(list.name);
                  }}
                >
                  <Text style={globalStyles.text}>{list.name}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    deleteFile(list.name);
                  }}
                >
                  <Text style={globalStyles.deleteText}>Delete list</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
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
                createNewFile(currentFile);
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
              exitComplimentsList(currentFile);
            }}
          >
            <Text style={globalStyles.deleteText}>Save compliment table</Text>
          </Pressable>
          <ScrollView style={globalStyles.scroll}>
            {compliments.map((comp, index) => (
              <View key={index} style={globalStyles.inLineText}>
                <Text style={globalStyles.text}>{comp}</Text>
                <Pressable
                  onPress={() => {
                    updateComplimentList(compliments.filter((c) => c !== comp));
                  }}
                >
                  <Text style={globalStyles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
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
