export const VLL_TEAMS = {
    TEAM_G: "W",
    TEAM_W: "G"
} as const;

export type VllTeams = (typeof VLL_TEAMS)[keyof typeof VLL_TEAMS];
