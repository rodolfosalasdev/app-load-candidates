import { TestBed } from '@angular/core/testing';

import { CreateCandidateService } from './create-candidate.service';

describe('CreateCandidateService', () => {
  let service: CreateCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
