
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CardComponent } from './card/card.component';
import { ConferencePipe } from './conference.pipe';
import { Team } from './models/Team';
import { TeamsServiceService } from './teams-service.service';

describe('AppComponent', () => {
  let teams: Team[];
  let teamsService: Spy<TeamsServiceService>;
  let rendered: MockedComponentFixture<AppComponent>;
  let component: AppComponent;
  let cardComponents: CardComponent[];
  beforeEach(async () => {
    teams = [{ id: 1, full_name: 'Test Team', abbreviation: 'TST', conference: 'East', games: [] }];
    teamsService = jasmine.createSpyObj(TeamsServiceService, ['getAllTeams']);
    teamsService.getAllTeams.and.returnValue(of(teams));
    await MockBuilder(AppComponent, AppModule)
      .mock(CardComponent)
      .provide({ provide: TeamsServiceService, useValue: teamsService });
    rendered = MockRender(AppComponent, null, { detectChanges: false });
    component = rendered.point.componentInstance;

  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });


  // describe('Loading', () => {

  //   it('appears when Loading', () => {
  //     expect(ngMocks.find(['data-testid', 'loading'])).toBeTruthy();
  //   })
  // })

  describe('Loading Teams details', () => {
    beforeEach(() => {
      rendered.detectChanges();
    })
    it('Loads all Team Details from Service', () => {
      expect(component.teams$).toEqual(teams);
    });

    it('Displays Each Team in a Card', () => {

      cardComponents = ngMocks.findAll(CardComponent).map(c => c.componentInstance);

      teams.forEach(team => {
        expect(cardComponents.find(c => c.team.id === team.id)).toBeTruthy();
      });

    });
  });
});
