import { TestBed } from '@angular/core/testing';

import { CreateCandidateService } from './create-candidate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('CreateCandidateService', () => {
  let service: CreateCandidateService;
  let httpMock: HttpTestingController;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CreateCandidateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
