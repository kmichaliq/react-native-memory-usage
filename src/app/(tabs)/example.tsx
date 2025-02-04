import { View } from "react-native";

import { Typography } from "@/src/shared/components/Typography";

export default function ExampleScreen() {
  return (
    <View className="flex-1 pt-[30%] bg-slate-100 items-center">
      <View>
        <Typography type="title">Example screen</Typography>
      </View>
      <Typography>description</Typography>
    </View>
  );
}
