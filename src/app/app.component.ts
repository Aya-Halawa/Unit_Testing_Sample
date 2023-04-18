import { Component } from '@angular/core';
import { TeamsServiceService } from './teams-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Team } from './models/team';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  teams$: Team[] = <Team[]>[];
  form: FormGroup = <FormGroup>{};
  trackedTeams: Map<number, Team> = new Map<number, Team>();
  constructor(private teamsService: TeamsServiceService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
    });
    this.getTeams();
  }
  getTeams(): void {
    this.teamsService.getAllTeams().subscribe(res => {
      this.teams$ = res;
      this.form.controls['name'].setValue(this.teams$[0]);
    })
  }
  trackTeam() {

    let team = this.form.controls['name'].getRawValue();
    this.teamsService.calcTeamStats(team, 12);
    this.trackedTeams.set(team.id, team);
  }

  untrackTeam(teamId: number) {
    this.trackedTeams.delete(teamId);
  }
}


