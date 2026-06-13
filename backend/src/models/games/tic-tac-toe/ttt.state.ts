export class TTTBoardState {
    private readonly board: ("X" | "O" | null)[];
    private currentTurn: "X" | "O" | null;

    constructor() {
        this.board = [null, null, null, null, null, null, null, null, null];
        this.currentTurn = Math.floor(Math.random() * 2) ? "X" : "O";
    }

    public placeSign(position: number, symbol: "X" | "O") {
        if (this.currentTurn === null) return;
        if (position > 8 || position < 0) return;
        if (this.board[position] !== null) return;
        if (this.currentTurn !== symbol) return;

        this.board[position] = symbol;

        this.currentTurn = this.currentTurn === "X" ? "O" : "X";
        this.checkWinner();
    }

    public checkWinner() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of wins) {
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
