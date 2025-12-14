import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomResponseType} from '../models/custom-response-type.model';
import {Gate} from '../models/gate.model';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {ClusterService} from '../services/cluster-service';
import {Cluster} from '../models/cluster.model';
import {FormsModule} from '@angular/forms';
import {ManagementButtonsComponent} from '../shared/management-buttons/management-buttons.component';
import {Session} from '../models/session.model';
import {SessionService} from '../services/session-service';
import {SessionGate} from '../models/session-gate.model';

@Component({
  selector: 'app-session-gates-management',
  imports: [
    FormsModule,
    ManagementButtonsComponent
  ],
  templateUrl: './session-gates-management.html',
  styleUrl: './session-gates-management.less',
})
export class SessionGatesManagement implements AfterViewInit {

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private clusterService: ClusterService
    ,private sessionService:SessionService
    , private cd: ChangeDetectorRef
    , private route: ActivatedRoute) {
  }

  gates: Gate[] = [];
  clusters: Cluster[] = [];
  unselectedClusters: Cluster[] = [];
  session: Session;
  sessionGates:SessionGate[]=[];

  async ngAfterViewInit(): Promise<void> {
    let sessionId = this.route.snapshot.paramMap.get('id');
    this.session = await this.sessionService.GetSessionById(this.app, sessionId);
    console.log('SessionId:', sessionId);
    this.GetGates()

    this.cd.detectChanges();
  }

  public async GetGates() {
   // this.gates = await this.gateService.GetGates(this.app);
   //  this.cd.detectChanges();
    this.app.CallService(this.api.GetGates(this.app.readToken()), ((data: CustomResponseType<Gate>) => {
      this.gates = data.dataList;
      this.gates.forEach(gate => {
        let sessionGate = new SessionGate();
        sessionGate.gateId = gate.id;
        sessionGate.sessionId = this.session.id;
        this.sessionGates.push(sessionGate);
      });
      this.GetClusters();
      this.cd.detectChanges();
      console.log(this.clusters);
    }));
  }

  public GetClusters() {
    this.app.CallService(this.api.GetClusters(this.app.readToken()), ((data: CustomResponseType<Cluster>) => {
      this.clusters = data.dataList;
      this.cd.detectChanges();
      console.log(this.clusters);
      this.unselectedClusters = data.dataList;
    }));
  }

  protected GetRightGates() {
    return this.gates.filter(gate => parseInt(gate.gateNumber) % 2 == 0);
  }

  protected GetLeftGates() {
    return this.gates.filter(gate => parseInt(gate.gateNumber) % 2 == 1);
  }

  protected selectCluster(event: any, gate: Gate) {
    const clusterId = event.target.value;

    // فقط اگر یک cluster واقعی انتخاب شده
    if (clusterId && clusterId !== "disabled") {
      this.unselectedClusters = this.unselectedClusters.filter(
        f => f.id != clusterId
      );
    }
    let sessionGate = this.sessionGates.filter(f=>f.gateId==gate.id);
    if (sessionGate.length>0){
      sessionGate[0].clusterId = clusterId;
    }

    console.log("Gate:", gate);
    console.log("Selected:", clusterId);
  }

  protected GetUnselectedClusters(gate: Gate) {
    return this.unselectedClusters.concat(this.clusters.filter(f=>f.id == gate.selectedClusterId));
  }

  protected SetSessionGates() {

    this.app.CallService(this.api.SetSessionGates(this.app.readToken(),this.sessionGates),((data: CustomResponseType<boolean>) => {
      this.cd.detectChanges();
      console.log(this.gates);
    }));
  }

  protected ClearSessionGates() {

  }
}
