import { TestBed } from '@angular/core/testing';

import { GetParticipantsService } from './get-participants.service';

describe('GetParticipantsService', () => {
  let service: GetParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
