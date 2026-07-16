import { Directory, File } from "expo-file-system";

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
  const file = new File(dir, fileName);

  return JSON.parse(file.textSync());
};
