import { Platform, View } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";

export default function HomeScreen() {
  return (
    <View>
      <View>
        <ThemedText type="title">Welcome!</ThemedText>
      </View>
      <View>
        <ThemedText>Welcome page</ThemedText>
      </View>
    </View>
  );
}
