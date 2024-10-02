import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICandidatesListResponse } from '../_interfaces/candidates-liste-response.interface';
import { urlConfig } from '../_config/url-config';
import { ICreateCandidate } from '../_interfaces/create-candidate.interface';


describe('CandidatesService', () => {
  let service: CandidatesService;
  let httpMock: HttpTestingController;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CandidatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search for candidates and update the signal', () => {
    const mockCandidates: ICandidatesListResponse[] = [
      {
        name: 'Rodolfo',
        surname: 'Salas',
        seniority: 'Senior',
        years: 5,
        availability: true
      },
      {
        name: 'Larissa',
        surname: 'Salas',
        seniority: 'Junior',
        years: 1,
        availability: false
      },
    ];

    service.getCandidates();

    const req = httpMock.expectOne(urlConfig.candidatesListUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCandidates);

    expect(service.candidatesSignal()).toEqual(mockCandidates);
  });

  it('should create a candidate POST', () => {
    const mockCandidate: ICreateCandidate = { 
      name: 'Rodolfo',
      surname: 'Salas',
      file: {
        seniority: 'Senior',
        years: 5,
        availability: true
      }
    };

    service.createCandidate(mockCandidate).subscribe((candidate) => {
      expect(candidate).toEqual(mockCandidate);
    });

    const req = httpMock.expectOne(urlConfig.createCandidateUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCandidate);
    req.flush(mockCandidate);
  });
});
