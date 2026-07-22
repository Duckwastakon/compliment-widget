import { createContext } from "react";
import { StyleSheet } from "react-native";

export const allThemes: string[] = ["light", "dark"];

export const allThemeDesigns: Record<string, Record<string, string>> = {
  light: {
    primaryColor: "#FFFFFF",
    secondaryColor: "#CECECE",
    thirdColor: "#A2A0A0",
    textColor: "#000000",
    buttonTextColor: "#FFFFFF",
    buttonMainColor: "#60AFFF",
    buttonMainClickedColor: "#1083FB",
    buttonMainDisabledColor: "#BBDCFF",
    buttonSecondaryColor: "#59DAFF",
    buttonSecondaryClickedColor: "#07C5FB",
    buttonSecondaryDisabledColor: "#B8EFFF",
    accentColor: "#3799FF",
    deleteColor: "#f24b4b",
  },
  dark: {
    primaryColor: "#000000",
    secondaryColor: "#CECECE",
    thirdColor: "#A2A0A0",
    textColor: "#000000",
    buttonTextColor: "#FFFFFF",
    buttonMainColor: "#60AFFF",
    buttonMainClickedColor: "#1083FB",
    buttonMainDisabledColor: "#BBDCFF",
    buttonSecondaryColor: "#59DAFF",
    buttonSecondaryClickedColor: "#07C5FB",
    buttonSecondaryDisabledColor: "#B8EFFF",
    accentColor: "#3799FF",
    deleteColor: "#f24b4b",
  },
};

export const textSizes: Record<string, number> = {
  header: 32,
  subHeader: 24,
  subSubHeader: 20,
  text: 16,
  subText: 12,
};

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mainIndexContainer: {
    width: "90%",
    height: "80%",
    justifyContent: "center",
  },

  thanksText: {
    maxWidth: "65%",
    fontSize: textSizes.subText,
    marginBottom: 16,
  },

  currentComplimentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    width: "100%",
    minHeight: "10%",
    maxHeight: "30%",
    borderRadius: 16,
    justifyContent: "center",
  },

  complimentText: {
    fontSize: textSizes.header,
    fontWeight: 600,
    textAlign: "left",
  },

  timerText: {
    fontSize: textSizes.subSubHeader,
    textAlign: "left",
    marginBottom: 4,
  },

  skipTimerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 56,
  },

  skipTimerText: { fontSize: textSizes.text },

  settingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  extraSettingTitle: {
    fontSize: textSizes.text,
    fontWeight: "bold",
    marginBottom: 12,
  },

  settingText: {
    fontSize: textSizes.subText,
    fontWeight: "700",
    marginBottom: 4,
  },

  warningText: {
    fontSize: textSizes.subText,
    fontWeight: "400",
    marginBottom: 32,
  },

  digitContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 32,
    marginBottom: 16,
  },

  singleDigitContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
  },

  digitText: {
    fontSize: textSizes.subText,
    marginBottom: 4,
  },

  changeDigitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  changeButton: {
    borderRadius: 12,
    width: 24,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  plusMinusText: {
    fontSize: textSizes.text,
    fontWeight: 600,
  },

  updateButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 4,
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
  },

  updateButtonText: {
    fontSize: textSizes.subText,
    fontWeight: "bold",
  },

  checkBoxContainer: {
    flexDirection: "row",
    gap: 8,
  },

  checkBoxText: {
    fontSize: textSizes.subText,
  },
});

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 12,
  },

  headerText: {
    fontSize: textSizes.subHeader,
    fontWeight: "700",
  },

  headerInfo: {
    fontSize: textSizes.subText,
    fontWeight: "400",
  },

  listContainer: {
    height: "50%",
    maxHeight: "50%",
    width: "90%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
  },

  enterText: {
    fontSize: textSizes.text,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },

  createButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },

  createButtonText: {
    fontSize: textSizes.subText,
    fontWeight: "bold",
  },

  selectFileButton: {
    borderRadius: 8,
    width: "70%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  selectFileText: {
    fontSize: textSizes.text,
    fontWeight: "bold",
  },

  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    fontSize: textSizes.text,
    fontWeight: "bold",
  },

  buttonContainer: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  smallButton: {
    width: "40%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  inLineText: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 12,
  },

  fileNameContainer: {
    flex: 7,
    justifyContent: "center",
    textAlign: "left",
  },

  fileText: {
    fontWeight: "bold",
    fontSize: textSizes.subHeader,
    flexWrap: "wrap",
  },

  checkBoxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  complimentText: {
    fontWeight: "500",
    fontSize: textSizes.text,
    flexWrap: "wrap",
  },
});

export const themeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
  },

  titleText: {
    fontSize: textSizes.subHeader,
    fontWeight: "600",
    marginBottom: 8,
  },

  titleInfo: {
    fontSize: textSizes.text,
    fontWeight: "bold",
  },

  themeContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 12,
  },

  themeOrdering: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  themeObject: {
    width: "100%",
    minWidth: "80%",
    borderWidth: 4,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  themeObjectText: {
    flex: 1,
    fontSize: textSizes.header,
    fontWeight: "bold",
  },
});

export const SelectedTheme = createContext({
  theme: allThemeDesigns["dark"],
  setTheme: (val: Record<string, string>) => {},
});
