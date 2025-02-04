import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { Typography } from "@/src/shared/components/Typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Typography type="title">This screen doesn't exist.</Typography>
        <Link href="/">
          <Typography type="link">Go to home screen!</Typography>
        </Link>
      </View>
    </>
  );
}
