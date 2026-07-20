import { createContext } from "react";
import { StyleSheet } from "react-native";

export const allThemeDesigns: Record<string, Record<string, string>> = {
  dark: {
    backgroundColor: "#232323",
    textColor: "#ffffff",
    deepBackgroundColor: "#555555",
    outlineColor: "#101010",
    specialTextColor: "#cfd0d1",
  },
  light: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    deepBackgroundColor: "#bbbbbb",
    outlineColor: "#646464",
    specialTextColor: "#191a1b",
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

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    flexWrap: "wrap",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
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

  scroll: {
    margin: 16,
    borderWidth: 4,
    borderRadius: 4,
    maxHeight: "40%",
    alignSelf: "center",
    width: "80%",
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
    marginTop: 20,
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
});

export const SelectedTheme = createContext({
  theme: allThemeDesigns["dark"],
  setTheme: (val: Record<string, string>) => {},
});
