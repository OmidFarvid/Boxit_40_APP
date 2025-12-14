import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {Gate} from '../models/gate.model';
import {App} from '../app';
import {Session} from '../models/session.model';
import {CustomResponseType} from '../models/custom-response-type.model';
import {Api} from '../api';


@Injectable({
  providedIn: 'root'
})
export class GateService {

  constructor(private http: HttpClient,public apiService : Api) {}

  addGate(gate: Gate, token: string|null): Observable<{ id: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: string }>(`${environment.baseUrl}/gate/add`, gate,{headers});
  }

  getAllGates(): Observable<Gate[]> {
    return this.http.get<Gate[]>(`${environment.baseUrl}/gate/all`);
  }

  GetGates(appComponent: App): Promise<Gate[]> {
    return new Promise((resolve, reject) => {
      appComponent.CallService(
        this.apiService.GetGates(appComponent.readToken()),
        (data: CustomResponseType<Gate[]>) => {
          resolve(data.data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}
