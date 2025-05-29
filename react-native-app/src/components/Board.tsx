import React from "react";
import { View } from "react-native";
import { BoardState } from "../types";
import { Square } from "./Square";

interface BoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
}

export const Board: React.FC<BoardProps> = ({
  board,
  onSquareClick,
  winningLine,
}) => {
  const isWinningSquare = (index: number) => {
    return winningLine ? winningLine.includes(index) : false;
  };

  // Divide la board in 3 righe da 3 elementi
  const rows = [0, 1, 2].map((row) => board.slice(row * 3, row * 3 + 3));

  return (
    <View className="gap-1 my-2">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center">
          {row.map((value, colIndex) => {
            const idx = rowIndex * 3 + colIndex;
            return (
              <Square
                key={idx}
                value={value}
                onPress={() => onSquareClick(idx)}
                highlight={isWinningSquare(idx)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};
