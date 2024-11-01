import { TestBed } from '@angular/core/testing';

import { GetTournamentService } from './get-tournament.service';

describe('GetTournamentService', () => {
  let service: GetTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
