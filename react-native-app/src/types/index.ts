// Definizione dei tipi riutilizzabili per il gioco

export type Player = "X" | "O" | null;
export type Winner = "X" | "O" | "draw" | null;

export type BoardState = Player[]; // Array di 9 elementi

export interface WinnerResult {
  winner: Winner;
  line: number[] | null;
}

export type UPC = {
  key: string;
  quantity: number;
};

export type Carton = {
  id: string;
  CartonList: UPC[];
};
