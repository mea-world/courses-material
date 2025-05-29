import React from "react";
import { Pressable } from "react-native";
import { Text } from "./ui/text";
import { Player } from "../types";

interface SquareProps {
  value: Player;
  onPress: () => void;
  highlight: boolean;
}

export const Square: React.FC<SquareProps> = ({
  value,
  onPress,
  highlight,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`w-15 h-15 min-w-16 min-h-16 m-1 items-center justify-center rounded-lg border-2 border-[#333] ${
        highlight ? "bg-yellow-200" : "bg-white"
      } ${value ? "opacity-70" : "opacity-100"}`}
      disabled={!!value}
    >
      <Text className="text-2xl font-bold">{value}</Text>
    </Pressable>
  );
};
