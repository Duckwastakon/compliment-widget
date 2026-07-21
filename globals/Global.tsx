import { createContext } from "react";
import { StyleSheet } from "react-native";

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
    backgroundColor: "#232323",
    textColor: "#ffffff",
    deepBackgroundColor: "#555555",
    outlineColor: "#101010",
    specialTextColor: "#cfd0d1",
  },
  purple: {
    backgroundColor: "#A06CD5",
    textColor: "#E2CFEA",
    deepBackgroundColor: "#6247AA",
    outlineColor: "#062726",
    specialTextColor: "#102B3F",
  },
  rose: {
    backgroundColor: "#EEABC4",
    textColor: "#E15A97",
    deepBackgroundColor: "#C799A6",
    outlineColor: "#4B2840",
    specialTextColor: "#861388",
  },
  forest: {
    backgroundColor: "#172A3A",
    textColor: "#508991",
    deepBackgroundColor: "#004346",
    outlineColor: "#508991",
    specialTextColor: "#75DDDD",
  },
  fire: {
    backgroundColor: "#e9b340",
    textColor: "#e09f07",
    deepBackgroundColor: "#fa6d15",
    outlineColor: "#fe4b1f",
    specialTextColor: "#bbec1c",
  },
  oceanic: {
    backgroundColor: "#4940e9",
    textColor: "#4dcefd",
    deepBackgroundColor: "#8a2aff",
    outlineColor: "#0f6d84",
    specialTextColor: "#00feed",
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

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    flexWrap: "wrap",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    flexWrap: "wrap",
    margin: 6,
  },

  fileNameContainer: {
    flex: 7,
    marginLeft: 4,
    marginRight: 4,
    padding: 2,
  },

  deleteFileTextContainer: {
    flex: 2,
    marginLeft: 4,
    marginRight: 4,
    padding: 2,
  },

  activeSlider: {
    flex: 1,
  },

  deleteText: {
    fontSize: 16,
    textAlign: "right",
  },

  inLineText: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  complimentContainer: {
    margin: 8,
    padding: 10,
    width: "80%",
    maxHeight: "25%",
    minHeight: "10%",
    borderRadius: 8,
    justifyContent: "center",
  },

  complimentText: {
    fontSize: 24,
    textAlign: "left",
  },

  skipTimer: {
    marginTop: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 8,
  },

  widgetCustomContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },

  widgetFlatList: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    paddingTop: 24,
    paddingBottom: 24,
  },

  widgetContOrdering: {
    alignItems: "center",
    alignContent: "center",
  },

  buttonContainer: {
    minHeight: "15%",
    height: "15%",
    width: "100%",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  listContainer: {
    minHeight: "70%",
    height: "70%",
    margin: 16,
    borderWidth: 2,
    borderRadius: 8,
    alignSelf: "center",
    width: "80%",
  },

  headerInfoContainer: {
    minHeight: "5%",
    height: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  mainInsertContainer: {
    minHeight: "10%",
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  selectFileButton: {
    minWidth: "80%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  shareFileButton: {
    minWidth: "40%",
    width: "40%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  massInsertButton: {
    minWidth: "40%",
    width: "40%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  mainIndexContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },

  timerSettingContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  singleDigitContainer: {
    width: "28%",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 16,
    borderRadius: 12,
  },

  increaseDecreaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  changeButtonDesign: {
    padding: 8,
    borderRadius: 12,
  },

  singleDigitText: {
    padding: 6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 12,
    textAlign: "center",
  },

  setClickCheckboxContainer: {
    flexDirection: "row",
    gap: 8,
  },

  updateButton: {
    padding: 12,
    borderRadius: 12,
  },
});

export const SelectedTheme = createContext({
  theme: allThemeDesigns["dark"],
  setTheme: (val: Record<string, string>) => {},
});
