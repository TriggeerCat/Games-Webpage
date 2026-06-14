export const TIC_TAC_TOE_SIGNS = {
    X: "X",
    O: "O"
} as const;

export type TicTacToeSigns =
    (typeof TIC_TAC_TOE_SIGNS)[keyof typeof TIC_TAC_TOE_SIGNS];
