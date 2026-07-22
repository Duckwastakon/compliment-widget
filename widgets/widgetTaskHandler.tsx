import React from "react";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { StringWidget } from "./androidWidget";

import {
  getNewCompliment,
  getSkipOnClick,
  setNewTime,
} from "@/globals/dataController";
import sqliteStorage from "expo-sqlite/kv-store";
import { Linking } from "react-native";

const nameToWidget = {
  dispWidget: StringWidget,
};

export const LAST_STRING_KEY = "Widget:String";
export const LAST_THEME_KEY = "Widget:Theme";
export const TIME_LEFT_KEY = "Widget:Time";
export const EXTRA_TIME_KEY = "KEYNEEDTIME";

export function getStoredTheme(): string {
  return (sqliteStorage.getItemSync(LAST_THEME_KEY) || "light") as string;
}

export function getStoredString(): string {
  return (sqliteStorage.getItemSync(LAST_STRING_KEY) ||
    "Please setup the app") as string;
}

export function getStoredTime(): number {
  return (sqliteStorage.getItemSync(TIME_LEFT_KEY) || 0) as number;
}

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

  switch (props.widgetAction) {
    case "WIDGET_ADDED": {
      if (widgetInfo.widgetName === "dispWidget") {
        const theme = getStoredTheme();
        const lastString = getStoredString();
        const timeLeft = getStoredTime();

        props.renderWidget(
          <StringWidget
            theme={theme}
            timeLeft={timeLeft}
            currentString={lastString}
          />,
        );
      } else {
        props.renderWidget(<Widget />);
      }
      break;
    }

    case "WIDGET_UPDATE":
      if (widgetInfo.widgetName === "dispWidget") {
        const theme = getStoredTheme();
        const lastString = getStoredString();
        const timeLeft = getStoredTime();

        props.renderWidget(
          <StringWidget
            theme={theme}
            timeLeft={timeLeft}
            currentString={lastString}
          />,
        );
      }
      break;

    case "WIDGET_RESIZED":
      if (widgetInfo.widgetName === "dispWidget") {
        const theme = getStoredTheme();
        const lastString = getStoredString();
        const timeLeft = getStoredTime();

        props.renderWidget(
          <StringWidget
            theme={theme}
            timeLeft={timeLeft}
            currentString={lastString}
          />,
        );
      }
      break;

    case "WIDGET_DELETED":
      // Not needed for now
      break;

    case "WIDGET_CLICK":
      if (props.clickAction === "MY_ACTION") {
        if (getSkipOnClick()) {
          const theme = (props.clickActionData?.theme || "dark") as string;
          const lastString = getNewCompliment();
          setNewTime();

          const extraTime =
            Number(sqliteStorage.getItemSync(EXTRA_TIME_KEY)) ||
            60 * 1000 * 60 * 24;

          const timeLeft = Date.now() + extraTime;

          props.renderWidget(
            <StringWidget
              theme={theme}
              timeLeft={timeLeft}
              currentString={lastString}
            />,
          );
        } else {
          Linking.openURL("complimentwidget://home");
        }
      }
      break;

    default:
      break;
  }
}
