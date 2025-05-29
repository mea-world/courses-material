import React from "react";
import { View } from "react-native";
import { Text } from "./ui/text";
import { Player, Winner } from "../types";
import { useTranslation } from "react-i18next";

interface GameStatusProps {
  currentPlayer: Player;
  winner: Winner;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
}) => {
  const { t } = useTranslation();
  let status;
  if (winner === "draw") {
    status = t("screens.GameScreen.gameStatus.draw");
  } else if (winner) {
    status = t("screens.GameScreen.gameStatus.winner", { winner });
  } else {
    status = t("screens.GameScreen.gameStatus.turn", { player: currentPlayer });
  }
  return (
    <View className="my-4 items-center">
      <Text className="text-lg">{status}</Text>
    </View>
  );
};
