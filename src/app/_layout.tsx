import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import "@/global.css";

import { ActivityIndicator, View } from "react-native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { getDbInstance } from "@/src/shared/lib/drizzle";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const DevTools = () => {
  const { expoDb } = getDbInstance();

  useEffect(() => {
    console.log(
      'Drizzle studio enabled! Trigger by "shift + m" in console and then select expo-drizzle-studio-plugin'
    );
  }, []);

  useDrizzleStudio(expoDb);
  return null;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      {__DEV__ && <DevTools />}
      <SafeAreaView className="flex-1">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </Suspense>
  );
}
