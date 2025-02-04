import { View } from "react-native";

import { Typography } from "@/src/shared/components/Typography";
import { Button } from "@/src/shared/components/Button";

export default function HomeScreen() {
  const hello = () => {
    console.log("hello!!!");
  };

  return (
    <View className="flex-1 p-6 bg-slate-100 items-center">
      <View>
        <Typography type="title">SQLite + Drizzle ORM</Typography>
      </View>
      <View className="flex-row mt-4 gap-2">
        <Button label="Insert new device" onPress={hello} />
        <Button label="test" onPress={hello} />
        <Button label="test" onPress={hello} />
      </View>
    </View>
  );
}
