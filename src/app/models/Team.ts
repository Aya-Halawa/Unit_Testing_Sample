
import { Game } from "./Game";
import { TeamStats } from "./team-stats.model";

export interface Team {
    id: number;
    full_name: string;
    abbreviation: string;
    conference: string;
    games: Game[];
    stats: TeamStats;
}