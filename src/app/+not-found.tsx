import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}
