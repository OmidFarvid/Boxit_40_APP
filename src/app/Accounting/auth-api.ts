import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from './models/login-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(private httpClient: HttpClient) {
  }
  Login(loginRequest:LoginRequest): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/auth/login' , loginRequest);
  }
}
