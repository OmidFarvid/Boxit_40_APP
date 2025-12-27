import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Cluster} from '../models/cluster.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Session} from '../models/session.model';
import {App} from '../app';
import {CustomResponseType} from '../models/custom-response-type.model';
import {Api} from '../api';
import {Parcel} from '../models/parcel.model';
import {SessionDetailComponent} from '../session-detail/session-detail.component';
import {SessionDetail} from '../models/session-detail.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(public apiService: Api) {}

  GetSessionById(appComponent: App, sessionId: string | null,resolveCallback: Function){
    return new Promise((resolve, reject) => {
      appComponent.CallService(
        this.apiService.GetSessionById(appComponent.readToken(),sessionId==null ? "" :sessionId),
        (data: CustomResponseType<Session>) => {
          resolve(data.data);
          resolveCallback(data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  GetSessionDetailById(appComponent: App, sessionId: string | null): Promise<SessionDetail> {
    return new Promise((resolve, reject) => {
      appComponent.CallService(
        this.apiService.GetSessionDetailById(appComponent.readToken(),sessionId==null ? "" :sessionId),
        (data: CustomResponseType<SessionDetail>) => {
          resolve(data.data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  GetParcelsBySessionId(appComponent: App, sessionId: string | null ,resolveCallback: Function){
    return new Promise((resolve, reject) => {
      appComponent.CallService(
        this.apiService.GetParcelsBySessionId(appComponent.readToken(),sessionId==null ? "" :sessionId),
        (data: CustomResponseType<Parcel>) => {
          resolve(data.data);
          resolveCallback(data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}
