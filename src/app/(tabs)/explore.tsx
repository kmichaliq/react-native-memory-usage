import { View } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 border p-4">
      <View>
        <ThemedText type="title">Explore</ThemedText>
      </View>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
    </View>
  );
}
