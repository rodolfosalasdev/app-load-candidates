import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateCandidate } from '../_interfaces/create-candidate.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlConfig } from '../_config/url-config';

@Injectable({
  providedIn: 'root'
})
export class CreateCandidateService {
  private url = urlConfig.createCandidateUrl;

  constructor(private readonly http: HttpClient) { }

  public createCandidate(params: any): Observable<ICreateCandidate> {
    return this.http.post<ICreateCandidate>(this.url, params);
  }
}
