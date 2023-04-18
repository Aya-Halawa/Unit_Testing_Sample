import { GameResult } from "./GameResult.enum";

export interface TeamStats {
    avg_pts_scored: number;
    avg_pts_conceded: number;
    game_results: GameResult[];
}