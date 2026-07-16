"use no memo";
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

export function StringWidget({
  currentString,
  theme,
  timeLeft,
}: stringWidgetProperites) {
  const bgColors: Record<string, ColorProp> = {
    light: "#ffffff",
    dark: "#000000",
  };
  const textColors: Record<string, ColorProp> = {
    light: "#000000",
    dark: "#ffffff",
  };

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
      clickAction="OPEN_APP"
    >
      <TextWidget
        text={currentString}
        style={{
          fontSize: 48,
          color: textColor,
          fontWeight: "bold",
          marginBottom: 6,
        }}
      />
      <TextWidget
        text={timeLeft.toString()}
        style={{
          fontSize: 16,
          color: textColor,
          fontWeight: "200",
        }}
      />
    </FlexWidget>
  );
}
