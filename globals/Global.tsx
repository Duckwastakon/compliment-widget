import { StyleSheet } from "react-native";

export const colors = {
  background: "#222222",
  darkBackground: "#353535",
  textColor: "#ffffff",
  clickColor: "#748cb4",
  scrollColor: "#3de285",
  borderColor: "#3c3c3c",
  deleteTextColor: "#e04537",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  text: {
    fontSize: 16,
    color: colors.textColor,
    flexWrap: "wrap",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textColor,
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
    color: colors.deleteTextColor,
    textAlign: "right",
  },

  scroll: {
    backgroundColor: colors.darkBackground,
    margin: 16,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: colors.borderColor,
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
    backgroundColor: colors.darkBackground,
    width: "80%",
    maxHeight: "25%",
    minHeight: "10%",
    borderRadius: 8,
    justifyContent: "center",
  },

  complimentText: {
    fontSize: 24,
    color: colors.textColor,
    textAlign: "left",
  },

  skipTimer: {
    marginTop: 20,
  },
});
