import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {Cluster} from '../models/cluster.model';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(private http: HttpClient) {}

  addCluster(cluster: Cluster, token: string|null): Observable<{ id: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: string }>(`${environment.baseUrl}/cluster/add`, cluster,{headers});
  }

  getAllClusters(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(`${environment.baseUrl}/cluster/all`);
  }
}
