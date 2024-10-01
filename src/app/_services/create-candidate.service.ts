import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { urlConfig } from '../_config/url-config';
import { ICreateCandidate } from '../_interfaces/create-candidate.interface';
import { ICandidatesListResponse } from './../_interfaces/candidates-liste-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateCandidateService {
  private url = urlConfig;
  // private candidatesSubject = new BehaviorSubject<ICandidatesListResponse[]>([]);
  // public candidates$ = this.candidatesSubject.asObservable();

  //new
  public candidatesSignal = signal<ICandidatesListResponse[]>([]);

  constructor(private readonly http: HttpClient) { }

  public getCandidates() {
    return this.http.get<ICandidatesListResponse[]>(this.url.candidatesListUrl)
      .subscribe((candidates) => {
        this.candidatesSignal.set(candidates);
      });
  }

  public createCandidate(params: ICreateCandidate): Observable<ICreateCandidate> {
    return this.http.post<ICreateCandidate>(this.url.createCandidateUrl, params);
  }
}
