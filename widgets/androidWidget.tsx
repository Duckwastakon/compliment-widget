"use no memo";
import {
  getNewCompliment,
  setNewTime,
  timeToString,
} from "@/globals/dataController";
import React from "react";
import { ColorProp, FlexWidget, TextWidget } from "react-native-android-widget";

export function HelloWidget() {
  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 16,
      }}
      accessibilityLabel="Hello world widget"
    >
      <TextWidget
        text="This widget works somehow Yay"
        style={{
          fontSize: 32,
          fontFamily: "Inter",
          color: "#000000",
        }}
      />
    </FlexWidget>
  );
}

interface stringWidgetProperites {
  currentString: string;
  theme: string;
  timeLeft: number;
}

const allThemeDesigns: Record<string, Record<string, ColorProp>> = {
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
};

export function StringWidget({
  currentString,
  theme,
  timeLeft,
}: stringWidgetProperites) {
  let timeString: string;
  if (timeLeft < Date.now()) {
    currentString = getNewCompliment();
    setNewTime();
    timeString = "23:59:99";
  } else {
    const { hourString, minuteString, secondString } = timeToString(
      timeLeft - Date.now(),
    );
    timeString =
      hourString.substring(minuteString.length - 2, minuteString.length) +
      ":" +
      minuteString.substring(minuteString.length - 2, minuteString.length) +
      ":" +
      secondString.substring(minuteString.length - 2, minuteString.length);
  }

  const textColor = allThemeDesigns[theme]["textColor"] || "#000000";
  const bgColor = allThemeDesigns[theme]["backgroundColor"] || "#000000";

  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: bgColor,
        borderRadius: 24,
        padding: 12,
        flexDirection: "column",
      }}
      clickAction="MY_ACTION"
      clickActionData={{ theme: theme, timeLeft: timeLeft }}
      accessibilityLabel="Change compliment"
    >
      <TextWidget
        text={currentString}
        style={{
          fontSize: 24,
          color: textColor,
          fontWeight: "bold",
          marginBottom: 6,
        }}
      />
      <TextWidget
        text={timeString}
        style={{
          fontSize: 12,
          color: textColor,
          fontWeight: "200",
        }}
      />
    </FlexWidget>
  );
}
