import { Directory, File, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

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

  type fileMusts = { fileName: string };
  const FileText = ({ fileName }: fileMusts) => (
    <View style={globalStyles.inLineText}>
      <Pressable
        onPress={() => {
          openList(fileName);
        }}
      >
        <Text style={globalStyles.text}>{fileName}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          deleteFile(fileName);
        }}
      >
        <Text style={globalStyles.deleteText}>Delete list</Text>
      </Pressable>
    </View>
  );

  type stringMusts = { comp: string };
  const StringText = ({ comp }: stringMusts) => (
    <View style={globalStyles.inLineText}>
      <Text style={globalStyles.text}>{comp}</Text>
      <Pressable
        onPress={() => {
          updateComplimentList(compliments.filter((c) => c !== comp));
        }}
      >
        <Text style={globalStyles.deleteText}>Delete</Text>
      </Pressable>
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
