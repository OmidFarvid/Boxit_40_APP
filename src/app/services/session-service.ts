import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Cluster} from '../models/cluster.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Session} from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}
  getSessionById(): Observable<Session> {
    return this.http.get<Session>(`${environment.baseUrl}/session/getById`);
  }
}
