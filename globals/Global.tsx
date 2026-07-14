import { StyleSheet } from "react-native";

export const colors = {
  background: "#222222",
  textColor: "#ffffff",
  clickColor: "#748cb4",
  scrollColor: "#3de285",
  borderColor: "#ea41c3",
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
  },

  title: {
    fontSize: 24,
    color: colors.textColor,
  },

  deleteText: {
    fontSize: 16,
    color: colors.deleteTextColor,
    textAlign: "right",
  },

  scroll: {
    backgroundColor: colors.scrollColor,
    margin: 16,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: colors.borderColor,
    maxHeight: "40%",
    alignSelf: "center",
    width: "80%",
  },

  inLineText: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
