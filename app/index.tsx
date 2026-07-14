import { globalStyles } from "@/globals/Global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Main page</Text>
      <Link href="/customization"> Go to customizations</Link>
    </View>
  );
}
