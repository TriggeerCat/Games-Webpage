export const GAMES_LIST = {
    TIC_TAC_TOE: "tic-tac-toe",
    VERY_LOUD_LIBRARIANS: "very-loud-librarians"
} as const;

export type GamesEnum = (typeof GAMES_LIST)[keyof typeof GAMES_LIST];
