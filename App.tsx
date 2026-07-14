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

export default function App() {
  const [compliment, updateCompliment] = useState('');
  const [compliments, updateComplimentList] = useState<string[]>([]);
  const [complimentFile, updateComplimentFile] = useState('');
  const [viewing, updateViewing] = useState(false);
  const [complimentFiles, updateComplimentFiles] = useState<
    fileReader.ReadDirItem[]
  >([]);

  const loadFiles = async () => {
    await fileReader.mkdir(listPath);

    const result = await fileReader.readDir(listPath);
    updateComplimentFiles(result);
  };

  const saveFile = async (fileName: string) => {
    fileReader.mkdir(listPath);

    let path = listPath + fileName;
    await fileReader.writeFile(path, JSON.stringify(compliments), 'utf8');
  };

  const createNewFile = async (fileName: string) => {
    let res = await fileReader.exists(listPath + fileName);
    if (!res) {
      const def = [
        'you look good',
        'you have a good mindset',
        'keep up the good work',
      ];
      await fileReader.writeFile(
        listPath + fileName,
        JSON.stringify(def),
        'utf8',
      );

      loadFiles();
    }
  };

  const deleteFile = async (filePath: string) => {
    if (await fileReader.exists(filePath)) {
      await fileReader.unlink(filePath);

      loadFiles();
    }
  };

  const openList = async (fileName: string) => {
    updateComplimentFile('/' + fileName);
    updateViewing(true);

    let path = listPath + '/' + fileName;
    const listContent = await fileReader.readFile(path, 'utf8');
    updateComplimentList(JSON.parse(listContent));
  };

  const exitComplimentsList = (fileName: string) => {
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
            {complimentFiles.map((list, index) => (
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
                    deleteFile(list.path);
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
            <Text style={globalStyles.text}>Create new list</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={globalStyles.text}>{complimentFile}</Text>
          <Pressable
            onPress={() => {
              exitComplimentsList(complimentFile);
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
