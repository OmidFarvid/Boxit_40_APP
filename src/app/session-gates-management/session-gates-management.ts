import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    , private route: ActivatedRoute
    , private router: Router) {
  }

  gates: Gate[] = [];
  clusters: Cluster[] = [];
  pureClusters: string[] = [];
  unselectedPureClusters: string[] = [];
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
      this.GetSessionClusters();
      this.cd.detectChanges();
      console.log(this.clusters);
    }));
  }

  public GetSessionClusters() {
    this.app.CallService(this.api.GetSessionClusters(this.app.readToken(),this.session), ((data: CustomResponseType<string>) => {
      this.pureClusters = data.dataList;
      this.cd.detectChanges();
      console.log(this.clusters);
      this.unselectedPureClusters = data.dataList;
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
      this.unselectedPureClusters = this.unselectedPureClusters.filter(
        f => f != clusterId
      );
    }
    let sessionGate = this.sessionGates.filter(f=>f.gateId==gate.id);
    if (sessionGate.length>0){
      sessionGate[0].regionCode = clusterId;
    }


    console.log("Gate:", gate);
    console.log("Selected:", clusterId);
  }

  protected GetUnselectedClusters(gate: Gate) {
    return this.unselectedPureClusters.concat(this.pureClusters.filter(f=>f == gate.selectedClusterId));
  }

  protected SetSessionGates() {

    this.app.CallService(this.api.SetSessionGates(this.app.readToken(),this.sessionGates),((data: CustomResponseType<boolean>) => {
      this.cd.detectChanges();
      console.log(this.gates);
      this.router.navigate(['/sessionManagement']);
    }));
  }

  protected ClearSessionGates() {
    this.router.navigate(['/sessionManagement']);
  }
}
