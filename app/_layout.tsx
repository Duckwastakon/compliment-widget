import { Tabs } from "expo-router";

const TabBar = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="index" options={{ title: "home" }} />
    <Tabs.Screen name="customization" options={{ title: "custom" }} />
  </Tabs>
);

export default TabBar;
