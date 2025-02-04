import { View } from "react-native";
import { Typography } from "@/src/shared/components/Typography";
import { Button } from "@/src/shared/components/Button";
import { app } from "@/src/shared/modules";
import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { wait } from "@/src/shared/utils/wait";

export default function HomeScreen() {
  const [isGetDevicesLoopRunning, setGetDevicesIsLoopRunning] = useState(false);
  const intervalGetDevicesRef = useRef<NodeJS.Timeout | null>(null);

  const startGetDevicesLoop = () => {
    if (!isGetDevicesLoopRunning) {
      setGetDevicesIsLoopRunning(true);
      intervalGetDevicesRef.current = setInterval(async () => {
        console.log(
          `[${DateTime.now().toFormat("HH:mm:ss.SSS")}] GET loop iteration`
        );

        const devices = await app.devices.query.getDevices();
        console.log(`Fetched ${devices?.length ?? 0} devices from db`);
        console.log("\n");
      }, 1000);
    }
  };

  const stopGetDevicesLoop = () => {
    if (isGetDevicesLoopRunning && intervalGetDevicesRef.current) {
      clearInterval(intervalGetDevicesRef.current);
      setGetDevicesIsLoopRunning(false);
      intervalGetDevicesRef.current = null;
    }
  };

  // ==========================================

  const [isUpdateDevicesLoopRunning, setIsUpdateDevicesLoopRunning] =
    useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startUpdateDevicesLoop = async () => {
    if (!isUpdateDevicesLoopRunning) {
      setIsUpdateDevicesLoopRunning(true);
      abortControllerRef.current = new AbortController();

      try {
        while (!abortControllerRef.current?.signal.aborted) {
          console.log(
            `[${DateTime.now().toFormat("HH:mm:ss.SSS")}] UPDATE loop iteration`
          );

          const devices = await app.devices.query.getDevices();
          console.log(`Fetched ${devices?.length ?? 0} devices from db`);

          if (devices) {
            for (const device of devices) {
              if (abortControllerRef.current?.signal.aborted) break;
              await app.devices.mutation.setRandomAttributes(device.uuid);
              await wait(300);
            }
          }

          console.log("\n");

          if (!abortControllerRef.current?.signal.aborted) {
            await wait(300);
          }
        }
      } catch (error) {
        console.error("Update loop error:", error);
      } finally {
        setIsUpdateDevicesLoopRunning(false);
        abortControllerRef.current = null;
      }
    }
  };

  const stopUpdateDevicesLoop = () => {
    if (isUpdateDevicesLoopRunning && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // ==========================================

  useEffect(() => {
    console.log("HomeScreen mounted!!!");

    return () => {
      console.log("HomeScreen unmounted!!!");
      if (intervalGetDevicesRef.current) {
        clearInterval(intervalGetDevicesRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <View className="flex-1 pt-[30%] bg-slate-100 items-center">
      <View>
        <Typography type="title">SQLite + Drizzle ORM</Typography>
      </View>
      <View className="flex-row mt-4 gap-2">
        <Button
          variant="secondary"
          label="Insert new device"
          onPress={app.devices.mutation.insertRandomDevice}
        />
      </View>
      <View className="flex-row mt-4 gap-2">
        <Button
          variant={isGetDevicesLoopRunning ? "negative" : "primary"}
          label={
            isGetDevicesLoopRunning ? "Stop loop [GET]" : "Start loop [GET]"
          }
          onPress={
            isGetDevicesLoopRunning ? stopGetDevicesLoop : startGetDevicesLoop
          }
        />
        <Button
          variant={isUpdateDevicesLoopRunning ? "negative" : "primary"}
          label={
            isUpdateDevicesLoopRunning
              ? "Stop loop [UPDATE]"
              : "Start loop [UPDATE]"
          }
          onPress={
            isUpdateDevicesLoopRunning
              ? stopUpdateDevicesLoop
              : startUpdateDevicesLoop
          }
        />
      </View>
    </View>
  );
}
