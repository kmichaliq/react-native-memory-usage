import { View } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";

export default function ExampleScreen() {
  return (
    <View className="flex-1 p-6 bg-slate-100 items-center">
      <View>
        <ThemedText type="title">Example screen</ThemedText>
      </View>
      <ThemedText>description</ThemedText>
    </View>
  );
}
