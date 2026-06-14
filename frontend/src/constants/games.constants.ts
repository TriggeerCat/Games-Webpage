import { IGame } from "../types/game.type";

export const GAMES = [
    {
        id: "tic-tac-toe",
        name: "Хрестики-нулики",
        image: "/board-game-tic-tac-toe.png",
        minPlayers: 2,
        maxPlayers: 2
    },
    {
        id: "very-loud-librarians",
        name: "Ну дуже гучні бібліотекарі",
        image: "/nu-duzhe-huchni-bibliotekari.png",
        minPlayers: 2
    }
] as const satisfies IGame[];
