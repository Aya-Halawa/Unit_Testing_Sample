import { Component } from '@angular/core';
import { Team } from './models/Team';
import { TeamsServiceService } from './teams-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  teams$: Team[] = <Team[]>[];
  loading: boolean = true;
  constructor(private teamsService: TeamsServiceService) {

  }

  ngOnInit(): void {
    this.getTeams();
  }
  getTeams(): void {
    this.loading = true;
    this.teamsService.getAllTeams().subscribe(res => {
      this.loading = false;
      this.teams$ = res;
    })
  }
}


