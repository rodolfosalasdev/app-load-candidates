import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { urlConfig } from '../_config/url-config';
import { ICreateCandidate } from '../_interfaces/create-candidate.interface';
import { ICandidatesListResponse } from './../_interfaces/candidates-liste-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateCandidateService {
  private url = urlConfig;
  private candidatesSubject = new BehaviorSubject<ICandidatesListResponse[]>([]);
  public candidates$ = this.candidatesSubject.asObservable();

  constructor(private readonly http: HttpClient) { }

  public getCandidates(): Observable<ICandidatesListResponse[]> {
    return this.http.get<ICandidatesListResponse[]>(this.url.candidatesListUrl).pipe(
      tap(candidates => this.candidatesSubject.next(candidates))
    );
  }

  public createCandidate(params: ICreateCandidate): Observable<ICreateCandidate> {
    return this.http.post<ICreateCandidate>(this.url.createCandidateUrl, params).pipe(
      tap(() => this.refreshCandidates())
    );
  }

  private refreshCandidates() {
    this.getCandidates().subscribe();
  }
}
