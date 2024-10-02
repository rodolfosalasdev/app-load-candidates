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

  it('deve buscar os candidatos e atualizar o signal', () => {
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

    // Chama o método que faz a requisição HTTP
    service.getCandidates();

    // Simula a resposta da chamada GET
    const req = httpMock.expectOne(urlConfig.candidatesListUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCandidates); // Retorna os dados simulados

    // Verifica se o signal foi atualizado corretamente
    expect(service.candidatesSignal()).toEqual(mockCandidates);
  });

  it('deve criar um candidato via POST', () => {
    const mockCandidate: ICreateCandidate = { 
      name: 'Rodolfo',
      surname: 'Salas',
      file: {
        seniority: 'Senior',
        years: 5,
        availability: true
      }
    };

    // Chama o método que faz a requisição POST
    service.createCandidate(mockCandidate).subscribe((candidate) => {
      expect(candidate).toEqual(mockCandidate);
    });

    // Simula a resposta da chamada POST
    const req = httpMock.expectOne(urlConfig.createCandidateUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCandidate);
    req.flush(mockCandidate); // Retorna os dados simulados
  });
});
