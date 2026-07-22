import { setNewTheme } from "@/globals/dataController";
import {
  SelectedTheme,
  allThemeDesigns,
  allThemes,
  themeStyles,
} from "@/globals/Global";
import { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StringWidget } from "@/widgets/androidWidget";
import sqliteStorage from "expo-sqlite/kv-store";
import { requestWidgetUpdate } from "react-native-android-widget";

export default function WidgetCustomizatiom() {
  const { theme, setTheme } = useContext(SelectedTheme);
  type themeVariables = { styleName: string };
  const ThemeDisplay = ({ styleName }: themeVariables) => {
    const bgColor = allThemeDesigns[styleName]["primaryColor"];
    const textColor = allThemeDesigns[styleName]["textColor"];
    const borderColor = allThemeDesigns[styleName]["accentColor"];

    const LAST_STRING_KEY = "Widget:String";
    const TIME_LEFT_KEY = "Widget:Time";

    function getStoredString(): string {
      return (sqliteStorage.getItemSync(LAST_STRING_KEY) ||
        "Please setup the app") as string;
    }

    function getStoredTime(): number {
      return (sqliteStorage.getItemSync(TIME_LEFT_KEY) || 0) as number;
    }
    const lastString = getStoredString();
    const timeLeft = getStoredTime();
    return (
      <Pressable
        style={[
          themeStyles.themeObject,
          {
            backgroundColor: bgColor,
            borderColor: borderColor,
          },
        ]}
        onPress={() => {
          setNewTheme(styleName);
          setTheme(allThemeDesigns[styleName]);

          // Android widget
          requestWidgetUpdate({
            widgetName: "dispWidget",
            renderWidget: () => (
              <StringWidget
                theme={styleName}
                timeLeft={timeLeft}
                currentString={lastString}
              />
            ),
          });
        }}
      >
        <Text
          style={[
            themeStyles.themeObjectText,
            {
              color: textColor,
            },
          ]}
        >
          {styleName}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={[themeStyles.container, { backgroundColor: theme.primaryColor }]}
    >
      <View style={[themeStyles.titleContainer, {}]}>
        <Text
          style={[
            themeStyles.titleText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Color themes
        </Text>
        <Text
          style={[
            themeStyles.titleInfo,
            {
              color: theme.accentColor,
            },
          ]}
        >
          Click on a color theme to select it
        </Text>
      </View>
      <FlatList
        style={[
          themeStyles.themeContainer,
          {
            backgroundColor: theme.secondaryColor,
          },
        ]}
        contentContainerStyle={themeStyles.themeOrdering}
        data={allThemes}
        renderItem={({ item }) => <ThemeDisplay styleName={item} />}
      />
    </SafeAreaView>
  );
}
