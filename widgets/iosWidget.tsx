import { timeToString } from "@/globals/dataController";
import { Text, VStack } from "@expo/ui/swift-ui";
import { background, font, foregroundStyle } from "@expo/ui/swift-ui/modifiers";
import { createWidget, type WidgetEnvironment } from "expo-widgets";

type MyWidgetProps = {
  currentCompliment: string;
  updateTime: number;
  backgroundColor: string;
  textColor: string;
};

const MyWidget = (props: MyWidgetProps, environment: WidgetEnvironment) => {
  "widget";

  const timeStrings = timeToString(props.updateTime - Date.now());
  return (
    <VStack modifiers={[background(props.backgroundColor)]}>
      <Text
        modifiers={[
          font({ weight: "bold", size: 32 }),
          foregroundStyle(props.textColor),
        ]}
      >
        {props.currentCompliment}
      </Text>
      <Text>
        next compliment in:{" "}
        {timeStrings.hourString +
          ":" +
          timeStrings.minuteString +
          ":" +
          timeStrings.secondString}
      </Text>
    </VStack>
  );
};

export default createWidget("MyWidget", MyWidget);
