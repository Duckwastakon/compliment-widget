import { setNewTheme } from "@/globals/dataController";
import { allThemeDesigns, globalStyles, SelectedTheme } from "@/globals/Global";
import { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const allThemes: string[] = ["dark", "light", "purple", "rose", "forest"];

export default function WidgetCustomizatiom() {
  const { theme, setTheme } = useContext(SelectedTheme);
  type themeVariables = { styleName: string };
  const ThemeDisplay = ({ styleName }: themeVariables) => {
    const bgColor = allThemeDesigns[styleName]["backgroundColor"];
    const textColor = allThemeDesigns[styleName]["textColor"];
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
