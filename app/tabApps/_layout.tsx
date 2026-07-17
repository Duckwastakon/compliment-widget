import { Tabs } from "expo-router";

const TabBar = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "home" }} />
      <Tabs.Screen name="customization" options={{ title: "custom" }} />
      <Tabs.Screen name="widgetCustomization" options={{ title: "widget" }} />
    </Tabs>
  );
};

export default TabBar;
