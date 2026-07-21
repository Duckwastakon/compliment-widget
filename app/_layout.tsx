import { loadCurrentTheme } from "@/globals/dataController";
import { allThemeDesigns, SelectedTheme } from "@/globals/Global";
import { Stack } from "expo-router";
import { useState } from "react";

const ThemeSetter = () => {
  const currentTheme: string = loadCurrentTheme();
  let currentThemeData = allThemeDesigns[currentTheme];
  if (currentThemeData === undefined) {
    currentThemeData = allThemeDesigns["dark"];
  }

  console.log(currentTheme);

  const [theme, setTheme] = useState(currentThemeData);
  console.log(theme);

  return (
    <SelectedTheme.Provider value={{ theme, setTheme }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SelectedTheme.Provider>
  );
};

export default ThemeSetter;
