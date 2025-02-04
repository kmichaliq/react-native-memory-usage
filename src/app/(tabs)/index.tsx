import { Platform, View } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";

export default function HomeScreen() {
  return (
    <View className="flex-1 p-6 bg-slate-100 items-center">
      <View>
        <ThemedText type="title">Home screen</ThemedText>
      </View>
      <View>
        <ThemedText>description</ThemedText>
      </View>
    </View>
  );
}
