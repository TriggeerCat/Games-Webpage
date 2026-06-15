import { VLL_TEAMS, VllTeams } from "../../../enums/vll-teams.enum";
import { VllCategoriesDeck } from "./vll.categories.deck";
import { VllLettersDeck } from "./vll.letters.deck";

export class VllBoardState {
    private readonly lettersDeck = [...VllLettersDeck];
    private readonly categoriesDeck = [...VllCategoriesDeck];
    private readonly scores: number[] = [0, 0];
    private currentLetter: string[] = [];
    private currentCategory: string[] = [];
    private currentTurn: VllTeams;
    private currentRound: number = 0;

    constructor() {
        this.currentTurn = Math.floor(Math.random() * 2)
            ? VLL_TEAMS.TEAM_G
            : VLL_TEAMS.TEAM_W;
    }

    public drawCard(drawCategory: boolean) {
        if (drawCategory) {
            if (this.categoriesDeck.length < 5) return;
            for (let i = 0; i < 5; i++) {
                this.currentCategory[i] = this.categoriesDeck.splice(
                    Math.floor(Math.random() * this.categoriesDeck.length),
                    1
                )[0];
            }
        }

        this.currentLetter = this.lettersDeck.splice(
            Math.floor(Math.random() * this.lettersDeck.length),
            1
        )[0];
    }

    public scorePoints(points: number) {
        const turn = this.currentTurn === VLL_TEAMS.TEAM_G ? 0 : 1;
        this.scores[turn] += points;
    }

    public startRound() {
        this.currentRound++;
        this.currentTurn =
            this.currentTurn === VLL_TEAMS.TEAM_G
                ? VLL_TEAMS.TEAM_W
                : VLL_TEAMS.TEAM_G;
    }

    public endRound() {
        this.scorePoints(2);
        this.currentLetter = [];
        this.currentCategory = [];
    }

    public getState() {
        return {
            scores: this.scores,
            currentLetter: this.currentLetter,
            currentCategory: this.currentCategory,
            currentTurn: this.currentTurn,
            currentRound: this.currentRound
        };
    }
}
