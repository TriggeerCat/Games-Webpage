import { TicTacToeSigns } from "../enum/ttt-signs.enum";

export interface ITicTacToe {
    board: (TicTacToeSigns | null)[];
    currentTurn: TicTacToeSigns | null;
}
