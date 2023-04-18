import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIResponce } from './APIResponse';
import { Game } from './models/Game';
import { formatDate } from '@angular/common';
import { GameResult } from './models/GameResult.enum';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {


  private apiUrl = 'https://free-nba.p.rapidapi.com/';
  private headers = {
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  };

  constructor(private http: HttpClient) { }


  getAllTeams(): Observable<Team[]> {
    const options = {
      headers: this.headers,
    };
    return this.http
      .get<APIResponce<Team[]>>(this.apiUrl + 'teams', options)
      .pipe(map((res) => res.data));
  }

  getTeam(teamId: number): Observable<Team> {
    const options = {
      headers: this.headers
    };
    return this.http
      .get<Team>(this.apiUrl + 'teams/' + teamId, options);
  }

  getTeamGames(teamId: number, daysCount: number): Observable<Game[]> {
    let params = new HttpParams();
    let today = new Date();

    for (let i = 1; i <= daysCount; i++) {
      params = params.append(
        'dates[]',
        formatDate(
          new Date(new Date().setDate(today.getDate() - i)),
          'yyyy/MM/dd',
          'en'
        )
      );
    }

    params = params.set('team_ids[]', teamId);
    params = params.set('page', '0');
    params = params.set('per_page', '12');
    const options = {
      params: params,
      headers: this.headers,
    };
    return this.http
      .get<APIResponce<Game[]>>(this.apiUrl + 'games', options)
      .pipe(map((res) => res.data));
  }

  calcTeamStats(team: Team, daysCount: number) {
    this.getTeamGames(team.id, daysCount).subscribe((games) => {
      team.games = games;
      let scoredPts: number = 0;
      let concededPts: number = 0;
      let game_results: GameResult[] = [];
      games.forEach((game) => {
        if (team.id == game.home_team.id) {
          scoredPts += game.home_team_score;
          concededPts += game.visitor_team_score;
          game_results.push(
            game.home_team_score > game.visitor_team_score
              ? GameResult.W
              : GameResult.L
          );
        } else {
          // Team is a visitor team
          scoredPts += game.visitor_team_score;
          concededPts += game.home_team_score;
          game_results.push(
            game.home_team_score < game.visitor_team_score
              ? GameResult.W
              : GameResult.L
          );
        }
      });
      team.stats = {
        avg_pts_conceded: Math.floor(concededPts / games.length),
        avg_pts_scored: Math.floor(scoredPts / games.length),
        game_results: game_results,
      };
    });
  }
}
