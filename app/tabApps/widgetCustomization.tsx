import { setNewTheme } from "@/globals/dataController";
import { allThemeDesigns, globalStyles, SelectedTheme } from "@/globals/Global";
import { StringWidget } from "@/widgets/androidWidget";
import { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { requestWidgetUpdate } from "react-native-android-widget";
import { SafeAreaView } from "react-native-safe-area-context";

import sqliteStorage from "expo-sqlite/kv-store";

const allThemes: string[] = ["dark", "light", "purple", "rose", "forest"];

export default function WidgetCustomizatiom() {
  const { theme, setTheme } = useContext(SelectedTheme);
  type themeVariables = { styleName: string };
  const ThemeDisplay = ({ styleName }: themeVariables) => {
    const bgColor = allThemeDesigns[styleName]["backgroundColor"];
    const textColor = allThemeDesigns[styleName]["textColor"];

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
        style={{
          width: "100%",
          minWidth: "100%",
          alignItems: "center",
          alignContent: "center",
        }}
        onPress={() => {
          setNewTheme(styleName);
          setTheme(allThemeDesigns[styleName]);
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
        <View
          style={{
            width: "90%",
            minWidth: "90%",
            borderRadius: 4,
            padding: 16,
            alignItems: "center",
            alignContent: "center",
            backgroundColor: bgColor,
          }}
        >
          <Text
            style={{
              flex: 1,
              width: "100%",
              fontSize: 32,
              fontWeight: "bold",
              color: textColor,
            }}
          >
            {styleName}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.widgetCustomContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <Text
        style={{
          fontSize: 20,
          alignItems: "center",
          alignContent: "center",
          color: theme.textColor,
        }}
      >
        Choose a widget color scheme
      </Text>
      <FlatList
        style={[
          globalStyles.widgetFlatList,
          {
            backgroundColor: theme.deepBackgroundColor,
          },
        ]}
        contentContainerStyle={globalStyles.widgetContOrdering}
        data={allThemes}
        renderItem={({ item }) => <ThemeDisplay styleName={item} />}
      />
    </SafeAreaView>
  );
}
