import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../app.module';
import { ConferencePipe } from '../conference.pipe';
import { Team } from '../models/Team';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: MockedComponentFixture<CardComponent, { team: Team }>;

  beforeEach(async () => {

    await MockBuilder(CardComponent, AppModule).mock(ConferencePipe);

    let team: Team = { id: 1, full_name: 'Fake Team', abbreviation: 'FT', conference: 'west', games: [] }
    fixture = MockRender(CardComponent, { team: team }, { detectChanges: false });
    component = fixture.point.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
