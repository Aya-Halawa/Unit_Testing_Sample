import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameResult } from '../models/GameResult.enum';
import { Team } from '../models/team';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() team: Team = <Team>{};
  @Output()
  untrackTeam: EventEmitter<void> = new EventEmitter<void>();
  GameResult = GameResult;

  constructor() { }

  ngOnInit(): void {
  }

}
