import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cluster} from './models/cluster.model';

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

}
