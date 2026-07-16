import React from "react";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { HelloWidget, StringWidget } from "./androidWidget";

import sqliteStorage from "expo-sqlite/kv-store";
import { Linking } from "react-native";

const nameToWidget = {
  Hello: HelloWidget,
  dispWidget: StringWidget,
};

export const LAST_STRING_KEY = "Widget:String";
export const LAST_THEME_KEY = "Widget:Theme";
export const TIME_LEFT_KEY = "Widget:Time";

export function getStoredTheme(): string {
  return (sqliteStorage.getItemSync(LAST_THEME_KEY) || "dark") as string;
}

export function getStoredString(): string {
  return (sqliteStorage.getItemSync(LAST_STRING_KEY) ||
    "Please setup the app") as string;
}

export function getStoredTime(): number {
  return (sqliteStorage.getItemSync(TIME_LEFT_KEY) || Date.now()) as number;
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
      // Not needed for now
      break;

    case "WIDGET_RESIZED":
      // Not needed for now
      break;

    case "WIDGET_DELETED":
      // Not needed for now
      break;

    case "WIDGET_CLICK":
      if (props.clickAction === "OPEN_APP") {
        Linking.openURL("complimentwidget://index");
      }
      const theme = (props.clickActionData?.theme || "dark") as string;
      const lastString = getStoredString();
      const timeLeft = getStoredTime();

      if (widgetInfo.widgetName === "dispWidget") {
        props.renderWidget(
          <StringWidget
            theme={theme}
            timeLeft={timeLeft}
            currentString={lastString}
          />,
        );
      }
      break;

    default:
      break;
  }
}
