import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Team } from './models/Team';
import { HttpClient } from '@angular/common/http';
import { APIResponce } from './APIResponse';

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

  addTeam(): Team {
    console.log("hello");
    return <Team>{};
  }
}
