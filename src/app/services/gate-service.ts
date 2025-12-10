import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {Gate} from '../models/gate.model';


@Injectable({
  providedIn: 'root'
})
export class GateService {

  constructor(private http: HttpClient) {}

  addGate(gate: Gate, token: string|null): Observable<{ id: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: string }>(`${environment.baseUrl}/gate/add`, gate,{headers});
  }

  getAllGates(): Observable<Gate[]> {
    return this.http.get<Gate[]>(`${environment.baseUrl}/gate/all`);
  }
}
