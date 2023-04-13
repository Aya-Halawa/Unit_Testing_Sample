import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AppModule } from './app.module';

import { TeamsServiceService } from './teams-service.service';

describe('TeamsServiceService', () => {
  let service: TeamsServiceService;

  beforeEach(async () => {
    await MockBuilder(TeamsServiceService, AppModule).replace(
      HttpClientModule,
      HttpClientModule
    )
    service = ngMocks.findInstance(TeamsServiceService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
