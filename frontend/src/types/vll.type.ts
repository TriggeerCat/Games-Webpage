import { VllTeams } from "../enum/vll-teams.enum";

export interface IVll {
    scores: number[];
    currentLetter: string[];
    currentCategory: string[];
    currentTurn: VllTeams;
    currentRound: number;
}
