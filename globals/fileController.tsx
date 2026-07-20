import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";

import { Directory, File, Paths } from "expo-file-system";

export const getAllFiles = (dir: Directory) => {
  try {
    const files = dir.list();

    return files;
  } catch (error) {
    console.error(error);
  }
};

export const saveFile = async (
  dir: Directory,
  fileName: string,
  value: string = "",
) => {
  try {
    const file = new File(dir, fileName);
    file.write(value);
  } catch (error) {
    console.error(error);
  }
};

export const createNewFile = async (
  dir: Directory,
  fileName: string,
  startingValue: string = "",
) => {
  try {
    const file = new File(dir, fileName);
    if (file.exists) return;
    file.create();
    file.write(startingValue);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFile = async (dir: Directory, fileName: string) => {
  try {
    const file = new File(dir, fileName);
    file.delete();
  } catch (error) {
    console.error(error);
  }
};

export const readFile = async (dir: Directory, fileName: string) => {
  try {
    const file = new File(dir, fileName);

    return JSON.parse(file.textSync());
  } catch (err) {
    return "No";
  }
};

const listDir = new Directory(Paths.document, "lists");
listDir.create({ idempotent: true });

export const getFile = async () => {
  try {
    const res = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!res.canceled) {
      const { uri } = res.assets[0];
      const file = new File(uri);
      if (file.type === "application/json") {
        createNewFile(listDir, res.assets[0].name, file.textSync());

        console.log("json");
      } else {
        if (file.type === "text/plain") {
          let stringArray = file.textSync().split(/\r?\n/);
          console.log(stringArray);
          let lines: string = JSON.stringify(file.textSync().split(/\r?\n/));

          console.log(file.name);
          createNewFile(
            listDir,
            res.assets[0].name.split(".")[0] + ".json",
            lines,
          );
          console.log("Ayy");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveFileToDevice = async (dir: Directory, fileName: string) => {
  try {
    const wantedFile = new File(dir, fileName);

    if (!wantedFile.exists) {
      console.log("file doesnt exsist");
    }

    await Sharing.shareAsync(wantedFile.uri);
  } catch (err) {
    console.log(err);
  }
};
