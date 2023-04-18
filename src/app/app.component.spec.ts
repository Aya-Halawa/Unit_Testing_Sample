
import { Spy } from 'jasmine-auto-spies';
import { MockBuilder, MockedComponentFixture, MockedDebugElement, MockProvider, MockRender, ngMocks } from 'ng-mocks';
import { bufferCount, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CardComponent } from './card/card.component';
import { Team } from './models/team';
import { TeamsServiceService } from './teams-service.service';
import { Dropdown } from 'primeng/dropdown';
import { click, findEl } from './shared/test-helper-functions';

describe('AppComponent', () => {
  let teams: Team[];
  let teamsService: Spy<TeamsServiceService>;
  let fixture: MockedComponentFixture<AppComponent>;
  let component: AppComponent;
  let cardComponents: CardComponent[];
  beforeEach(async () => {
    teams = [{ id: 1, full_name: 'Test Team', abbreviation: 'TST', conference: 'East', games: [], stats: { avg_pts_conceded: 0, avg_pts_scored: 0, game_results: [] } }];
    teamsService = jasmine.createSpyObj(TeamsServiceService, ['getAllTeams', 'calcTeamStats']);
    teamsService.getAllTeams.and.returnValue(of(teams));
    teamsService.calcTeamStats();

    await MockBuilder(AppComponent, AppModule)
      .mock(CardComponent)

      .provide({ provide: TeamsServiceService, useValue: teamsService });
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;

  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Teams dropdown', () => {
    let dropdown: MockedDebugElement<Dropdown>;
    beforeEach(() => {
      fixture.detectChanges();
      dropdown = findEl(fixture, 'teamsDropdown');
    })
    it('Loads all Team Details from Service', () => {
      expect(component.teams$).toEqual(teams);
    });

    it('Sends loaded teams to dropdown options', () => {
      const dropdownOptions = ngMocks.input(dropdown, 'options');
      expect(dropdownOptions).toBe(teams);

    });
    it('Displays selected Team in a card', () => {
      ngMocks.output(dropdown, 'onChange').emit(teams[0]);
      fixture.detectChanges();

      spyOn(component, 'trackTeam');
      click(fixture, 'trackBtn');

      fixture.detectChanges();
      expect(component.form.getRawValue()).toEqual({ name: teams[0] })
      expect(component.trackTeam).toHaveBeenCalledTimes(1);


      // cardComponents = ngMocks.findAll(CardComponent).map(c => c.componentInstance);
      // expect(cardComponents.length).toBe(1);

    })
  });
});
