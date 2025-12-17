import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {ClusterService} from '../services/cluster-service';
import {SessionService} from '../services/session-service';
import {ActivatedRoute, Router} from '@angular/router';
import { Session } from "../models/session.model";

@Component({
  selector: 'app-session-detail',
  imports: [],
  templateUrl: './session-detail.html',
  styleUrl: './session-detail.less',
})
export class SessionDetail  implements AfterViewInit {
  private session: Session;

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private clusterService: ClusterService
    ,private sessionService:SessionService
    , private cd: ChangeDetectorRef
    , private route: ActivatedRoute
    , private router: Router) {
  }

  async ngAfterViewInit() : Promise<void> {
    let sessionId = this.route.snapshot.paramMap.get('id');
    this.session = await this.sessionService.GetSessionById(this.app, sessionId);
    }
}
