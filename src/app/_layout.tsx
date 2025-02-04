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
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/src/shared/lib/drizzle/migrations/migrations";
import { SQLiteDatabase } from "expo-sqlite";
import { Typography } from "@/src/shared/components/Typography";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type DevToolsProps = {
  expoDb: SQLiteDatabase;
};

const DevTools = ({ expoDb }: DevToolsProps) => {
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

  const { expoDb, db } = getDbInstance();

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Typography>Migration error: {error.message}</Typography>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Typography>Migration is in progress...</Typography>
      </View>
    );
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      {__DEV__ && <DevTools expoDb={expoDb} />}
      <SafeAreaView className="flex-1">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </Suspense>
  );
}
