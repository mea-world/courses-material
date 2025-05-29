import React, { useState } from "react";
import { Screen } from "@/components/Screen";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { BoardState, Player, Winner } from "@/types";
import { checkWinner } from "@/utils/checkWinner";
import { Board } from "@/components/Board";
import { GameStatus } from "@/components/GameStatus";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const initialBoard: BoardState = Array(9).fill(null);

export const GameScreen = () => {
  const { t } = useTranslation();
  const [board, setBoard] = useState<BoardState>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Winner>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const handleSquareClick = (index: number) => {
    if (winner || board[index]) return;
    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("draw");
      setWinningLine(null);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <Screen title={t("screens.GameScreen.title")}>
      <GameStatus currentPlayer={currentPlayer} winner={winner} />
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        winningLine={winningLine}
      />
      <Button onPress={handleRestart} className="mt-5">
        <Text>{t("screens.GameScreen.restart")}</Text>
      </Button>
    </Screen>
  );
};
