import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {Region} from '../models/cluster.model';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(private http: HttpClient) {}

  addCluster(cluster: Region, token: string|null): Observable<{ id: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ id: string }>(`${environment.baseUrl}/cluster/add`, cluster,{headers});
  }

  getAllClusters(): Observable<Region[]> {
    return this.http.get<Region[]>(`${environment.baseUrl}/cluster/all`);
  }
}
