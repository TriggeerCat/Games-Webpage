export const GAMES = [
    {
        id: "tic-tac-toe",
        name: "Хрестики-нулики",
        image: "/board-game-tic-tac-toe.png",
        playerCount: "2 гравці",
        minPlayers: 2,
        maxPlayers: 2
    },
    {
        id: "very-loud-librarians",
        name: "Ну дуже гучні бібліотекарі",
        image: "/nu-duzhe-huchni-bibliotekari.png",
        playerCount: "2+ гравців",
        minPlayers: 2
    }
] as const;
