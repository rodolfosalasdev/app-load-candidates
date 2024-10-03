import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, first, Observable, retry, throwError } from 'rxjs';

import { urlConfig } from '../_config/url-config';
import { ICandidatesListResponse } from '../_interfaces/candidates-liste-response.interface';
import { ICreateCandidate } from '../_interfaces/create-candidate.interface';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private url = urlConfig;

  public candidatesSignal = signal<ICandidatesListResponse[]>([]);

  constructor(private readonly http: HttpClient) { }

  public getCandidates() {
    return this.http.get<ICandidatesListResponse[]>(this.url.candidatesListUrl)
      .pipe(
        first(),
        retry(2),
        catchError(this.handleError)
      )
      .subscribe((candidates) => {
        this.candidatesSignal.set(candidates);
      });
  }

  public createCandidate(params: ICreateCandidate): Observable<ICreateCandidate> {
    return this.http.post<ICreateCandidate>(this.url.createCandidateUrl, params)
      .pipe(
        first(),
        retry(2),
        catchError(this.handleError)
      );
  }

  public clearCandidates(): void {
    this.candidatesSignal.set([]);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
