import { Game } from "./Game";
import { GameResult } from "./GameResult.enum";

export interface Team {
    id: number;
    full_name: string;
    abbreviation: string;
    conference: string;
    games: Game[];
}