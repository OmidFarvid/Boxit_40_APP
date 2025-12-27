import { Injectable } from '@angular/core';
import {App} from '../app';
import {Session} from '../models/session.model';
import {CustomResponseType} from '../models/custom-response-type.model';
import {Api} from '../api';
import {SessionGate} from '../models/session-gate.model';

@Injectable({
  providedIn: 'root',
})
export class SessionGateService {
  constructor(public apiService: Api) {}
  GetCurrentSessionGates(appComponent: App): Promise<SessionGate[]> {
    return new Promise((resolve, reject) => {
      appComponent.CallService(
        this.apiService.GetCurrentSessionGates(appComponent.readToken()),
        (data: CustomResponseType<SessionGate[]>) => {
          resolve(data.data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}
