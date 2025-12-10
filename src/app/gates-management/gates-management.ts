import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Gate} from '../models/gate.model';
import {ManagementButtonsComponent} from '../shared/management-buttons/management-buttons.component';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {MaterialTableComponent} from '../shared/material-table/material-table.component';
import {CustomResponseType} from '../models/custom-response-type.model';

@Component({
  selector: 'app-gates-management',
  standalone: true,
  imports: [
    FormsModule,
    ManagementButtonsComponent,
    MaterialTableComponent
  ],
  templateUrl: './gates-management.html',
  styleUrl: './gates-management.less',
})
export class GatesManagement implements OnInit {
  async ngOnInit() {
    this.GetGates();
  }

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private cd: ChangeDetectorRef) {
  }

  protected gate: Gate = new Gate();
  GateType = Gate;
  gates: Gate[] = [];


  public GetGates() {
    this.app.CallService(this.api.GetGates(this.app.readToken()), ((data: CustomResponseType<Gate>) => {
      this.gates = data.dataList;
      this.cd.detectChanges();
      console.log(this.gates);
    }));
  }

  public AddGate() {
    this.app.CallService(this.api.AddGate(this.app.readToken(), this.gate), ((data: CustomResponseType<Gate>) => {
      this.gate = new Gate();
      this.GetGates();
      this.cd.detectChanges();
    }));
  }

  customDeleteMessage = (item: any) =>
    "1111";

  protected DeleteGate(gate: Gate) {
    this.app.CallService(this.api.DeleteGate(this.app.readToken(), gate), ((data: CustomResponseType<Gate>) => {
      this.GetGates();
      this.cd.detectChanges();
    }));
  }
}

