import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {ClusterService} from '../services/cluster-service';
import {SessionService} from '../services/session-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Session} from "../models/session.model";
import {Parcel} from '../models/parcel.model';
import {CustomResponseType} from '../models/custom-response-type.model';
import {MaterialTableComponent} from '../shared/material-table/material-table.component';

@Component({
  selector: 'app-session-detail',
  imports: [
    MaterialTableComponent
  ],
  templateUrl: './session-detail.component.html',
  styleUrl: './session-detail.component.less',
})
export class SessionDetailComponent implements AfterViewInit {
  private session: Session;
  public parcels: Parcel[] = [];
  public ParcelType = Parcel;

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private clusterService: ClusterService
    , private sessionService: SessionService
    , private cd: ChangeDetectorRef
    , private route: ActivatedRoute
    , private router: Router) {
  }

  async ngAfterViewInit(): Promise<void> {
    let sessionId = this.route.snapshot.paramMap.get('id');
    await this.sessionService.GetSessionById(this.app, sessionId, (data: CustomResponseType<Session>) => {
      this.session = data.data;
      // this.sessionService.GetParcelsBySessionId(this.app, this.session?.id, (data: CustomResponseType<Parcel>) => {
      //   this.parcels = data.dataList;
      //   this.cd.detectChanges();
      // });
    });
  }
}
