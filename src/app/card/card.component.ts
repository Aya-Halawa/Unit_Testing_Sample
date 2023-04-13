import { Component, Input, OnInit } from '@angular/core';
import { GameResult } from '../models/GameResult.enum';
import { Team } from '../models/Team';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() team: Team = <Team>{};


  constructor() { }

  ngOnInit(): void {
  }

}
