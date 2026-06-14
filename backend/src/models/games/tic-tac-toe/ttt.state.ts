import {
    TIC_TAC_TOE_SIGNS,
    TicTacToeSigns
} from "../../../enums/ttt-signs.enum";

const winsTable = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export class TTTBoardState {
    private readonly board: (TicTacToeSigns | null)[];
    private currentTurn: TicTacToeSigns | null;

    constructor() {
        this.board = [null, null, null, null, null, null, null, null, null];
        this.currentTurn = Math.floor(Math.random() * 2)
            ? TIC_TAC_TOE_SIGNS.X
            : TIC_TAC_TOE_SIGNS.O;
    }

    public placeSign(position: number, symbol: TicTacToeSigns) {
        if (this.currentTurn === null) return;
        if (position > 8 || position < 0) return;
        if (this.board[position] !== null) return;
        if (this.currentTurn !== symbol) return;

        this.board[position] = symbol;

        this.currentTurn =
            this.currentTurn === TIC_TAC_TOE_SIGNS.X
                ? TIC_TAC_TOE_SIGNS.O
                : TIC_TAC_TOE_SIGNS.X;
        this.checkWinner();
    }

    public checkWinner() {
        for (const [a, b, c] of winsTable) {
            if (
                this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                this.currentTurn = null;
                break;
            }
        }
    }

    public getState() {
        return {
            board: this.board,
            currentTurn: this.currentTurn
        };
    }
}
