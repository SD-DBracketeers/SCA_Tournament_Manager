import { TestBed } from '@angular/core/testing';

import { GetTournamentByIdService } from './get-tournament-by-id.service';

describe('GetTournamentByIdService', () => {
  let service: GetTournamentByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTournamentByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
