/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Pressable, StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Text, View, ScrollView, TextInput } from 'react-native';
import { colors, globalStyles } from './styles/global';
import { useEffect, useState } from 'react';

import fileReader from 'react-native-fs';
const listPath = fileReader.DocumentDirectoryPath + '/lists';

console.log(fileReader.DocumentDirectoryPath);

function DefApp() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={globalStyles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const App = () => {
  const [compliment, updateCompliment] = useState('');
  const [compliments, updateComplimentList] = useState<string[]>([]);
  const [complimentFile, updateComplimentFile] = useState('');
  const [viewing, updateViewing] = useState(false);
  const [complimentFiles, updateComplimentFiles] = useState<
    fileReader.ReadDirItem[]
  >([]);

  fileReader.mkdir(listPath);

  const loadFiles = async () => {
    const result = await fileReader.readDir(listPath);
    updateComplimentFiles(result);
  };

  const createNewFile = async (fileName: string) => {
    fileReader.mkdir(listPath);
    await fileReader.writeFile(listPath + fileName, 'Hey pretty', 'utf8');
  };

  const saveFile = async () => {
  fileReader.mkdir(listPath);

  let path = listPath + complimentFile
  await fileReader.writeFile(path, JSON.stringify(compliments), 'utf8');
}

  const openList = async (fileName: string) => {
    updateComplimentFile("/" + fileName);
    updateViewing(true);

    let path = listPath + complimentFile
    const listContent = await fileReader.readFile(path, "utf8");
    updateComplimentList(JSON.parse(listContent))
  }

  const exitComplimentsList = async () => {
    updateViewing(false);

    saveFile()
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <View style={globalStyles.container}>
      {!viewing ? (
        <>
          <ScrollView style={globalStyles.scroll}>
            {complimentFiles.map((list, index) => (
              <View key={index} style={globalStyles.inLineText}>
                <Pressable
                  onPress={() => {
                    openList(list.name);
                  }}
                >
                  <Text style={globalStyles.text}>{list.name}</Text>
                </Pressable>
                <Pressable>
                  <Text style={globalStyles.deleteText}>Delete list</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
          <TextInput
            style={globalStyles.text}
            placeholder="Enter new file name"
            placeholderTextColor={colors.textColor}
            onChangeText={updateComplimentFile}
            value={complimentFile}
          />
          <Pressable
            onPress={() => {
              if (complimentFile !== '') {
                createNewFile('/' + complimentFile + '.json');
                loadFiles();
                updateComplimentFile('');
              }
            }}
          >
            <Text style={globalStyles.text}>Create new compliment list</Text>
          </Pressable>
        </>
      ) : (
        <>
        <Text style={globalStyles.text}>{complimentFile}</Text>
          <Pressable onPress={exitComplimentsList}>
            <Text style={globalStyles.deleteText}>Save compliment table</Text>
          </Pressable>
          <ScrollView style={globalStyles.scroll}>
            {compliments.map((comp, index) => (
              <View key={index} style={globalStyles.inLineText}>
                <Text style={globalStyles.text}>{comp}</Text>
                <Pressable
                  onPress={() => {
                    updateComplimentList(compliments.filter(c => c !== comp));
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
              if (compliment !== '') {
                updateComplimentList([...compliments, compliment]);
              }
              updateCompliment('');
            }}
          >
            <Text style={globalStyles.text}>add compliment</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default App;
