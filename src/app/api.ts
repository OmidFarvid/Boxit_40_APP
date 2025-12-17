import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cluster} from './models/cluster.model';
import {Gate} from './models/gate.model';
import {Session} from './models/session.model';
import {SessionGate} from './models/session-gate.model';

@Injectable({
  providedIn: 'root',
})
export class Api {

  constructor(private httpClient: HttpClient) {
  }


  //--------------------------- Cluster
  public AddCluster(cluster: Cluster, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<{ id: string }>(`${environment.baseUrl }/add`, cluster);
  }

  public GetClusters(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Cluster/all', {headers});
  }

  public GetClustersByMachine(token: string, Machine_Id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/Cluster/GetClustersByMachine/' + token, {"ID": Machine_Id});
  }

  DeleteCluster(token: string, Cluster: Cluster): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/Cluster/DeleteCluster/' + token, Cluster);
  }

  UploadExcel(token: string, bytes: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(environment.baseUrl + '/Session/UploadExcel', bytes, {headers});
  }

  public GetGates(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Gate/all', {headers});
  }

  public AddGate(token: string,gate:Gate): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(environment.baseUrl + '/Gate/add',gate, {headers});
  }

  public DeleteGate(token: string,gate:Gate): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Gate/delete/'+gate.id, {headers});
  }
  ///////////////////////////////////Session
  public GetSessions(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/all', {headers});
  }

  public GetSessionById(token: string,sessionId:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/getById/'+sessionId, {headers});
  }

  public GetSessionDetailById(token: string,sessionId:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/GetDetailById/'+sessionId, {headers});
  }

  public AddSession(token: string,session:Session): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(environment.baseUrl + '/Session/add',session, {headers});
  }

  public DeleteSession(token: string,session:Session): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/delete/'+session.id, {headers});
  }

  public StartSession(token: string,session:Session): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/start/'+session.id, {headers});
  }

  public StopSession(token: string,session:Session): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/stop/'+session.id, {headers});
  }
///////////////////////////////////Session

  public SetSessionGates(token: string,sessionGates:SessionGate[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(environment.baseUrl + '/SessionGates/add',sessionGates, {headers});
  }

  public GetSessionGates(token: string,session:Session): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/stop/'+session.id, {headers});
  }
  public GetSessionClusters(token: string,session:Session): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(environment.baseUrl + '/Session/GetSessionClusters/'+session.id, {headers});
  }
}
