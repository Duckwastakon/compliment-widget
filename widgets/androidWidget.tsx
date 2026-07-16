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

const bgColors: Record<string, ColorProp> = {
  light: "#ffffff",
  dark: "#000000",
};
const textColors: Record<string, ColorProp> = {
  light: "#000000",
  dark: "#ffffff",
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

  const textColor = textColors[theme] || "#000000";
  const bgColor = bgColors[theme] || "#000000";

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
