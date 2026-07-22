"use no memo";
import {
  getExtraTimeValue,
  getNewCompliment,
  setNewTime,
  timeToString,
} from "@/globals/dataController";
import { textSizes } from "@/globals/Global";
import React from "react";
import {
  ColorProp,
  FlexWidget,
  OverlapWidget,
  TextWidget,
} from "react-native-android-widget";

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
    primaryColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#3799FF",
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
    const { hourString, minuteString, secondString } = timeToString(
      Number(getExtraTimeValue),
    );

    timeString =
      hourString.substring(minuteString.length - 2, minuteString.length) +
      ":" +
      minuteString.substring(minuteString.length - 2, minuteString.length) +
      ":" +
      secondString.substring(secondString.length - 2, secondString.length);
  } else {
    const { hourString, minuteString, secondString } = timeToString(
      timeLeft - Date.now(),
    );
    timeString =
      hourString.substring(minuteString.length - 2, minuteString.length) +
      ":" +
      minuteString.substring(minuteString.length - 2, minuteString.length) +
      ":" +
      secondString.substring(secondString.length - 2, secondString.length);
  }

  const textColor = allThemeDesigns[theme]["textColor"] || "#000000";
  const bgColor = allThemeDesigns[theme]["primaryColor"] || "#ffffff";
  const outlineColor = allThemeDesigns[theme]["accentColor"] || "#FFFFFF";

  console.log(currentString);
  return (
    <OverlapWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor: bgColor,
        borderRadius: 24,
        padding: 12,
        overflow: "hidden",
        borderColor: outlineColor,
        borderWidth: 4,
      }}
    >
      <FlexWidget
        style={{
          height: "match_parent",
          width: "match_parent",
          padding: 4,
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
        clickAction="MY_ACTION"
        clickActionData={{ theme: theme, timeLeft: timeLeft }}
        accessibilityLabel="Change compliment"
      >
        <TextWidget
          text={currentString}
          style={{
            fontSize: textSizes.subHeader,
            color: textColor,
            fontWeight: "bold",
            marginBottom: 6,
          }}
        />
      </FlexWidget>
      <FlexWidget
        style={{
          height: "match_parent",
          width: "match_parent",
          padding: 4,
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <FlexWidget
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: outlineColor,
            borderRadius: 8,
          }}
        >
          <TextWidget
            text={"next compliment in: " + timeString}
            style={{
              fontSize: textSizes.subText,
              color: bgColor,
              fontWeight: "700",
            }}
          />
        </FlexWidget>
      </FlexWidget>
    </OverlapWidget>
  );
}
