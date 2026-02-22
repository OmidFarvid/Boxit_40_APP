import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomResponseType} from '../models/custom-response-type.model';
import {Gate} from '../models/gate.model';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {ClusterService} from '../services/cluster-service';
import {Region} from '../models/cluster.model';
import {FormsModule} from '@angular/forms';
import {ManagementButtonsComponent} from '../shared/management-buttons/management-buttons.component';
import {Session} from '../models/session.model';
import {SessionService} from '../services/session-service';
import {SessionGate} from '../models/session-gate.model';
import {MatDialog} from '@angular/material/dialog';
import {GateSelectorDialog} from '../gate-selector-dialog/gate-selector-dialog';
import {SessionGateService} from '../services/session-gate-service';

@Component({
  selector: 'app-session-gates-management',
  imports: [
    FormsModule,
    ManagementButtonsComponent
  ],
  templateUrl: './gates-region-management.component.html',
  styleUrl: './gates-region-management.component.less',
})
export class GatesRegionManagement implements AfterViewInit {

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private clusterService: ClusterService
    , private sessionService: SessionService
    , private cd: ChangeDetectorRef
    , private route: ActivatedRoute
    , private router: Router
    , private sessionGateService: SessionGateService
    , private dialog: MatDialog) {
  }

  gates: Gate[] = [];
  regions: Region[] = [];
  pureRegions: string[] = [];
  unselectedRegions: Region[] = [];
  session: Session;

  ngAfterViewInit(){
    let sessionId = this.route.snapshot.paramMap.get('id');
    console.log('SessionId:', sessionId);
    this.GetGates();
  }

  public GetGates() {
    this.app.CallService(this.api.GetGates(this.app.readToken()), ((data: CustomResponseType<Gate>) => {
      this.gates = data.dataList;
//      this.GetSessionGates();
      this.GetRegions();
      console.log(this.gates);
    }));
  }

  public GetRegions() {
    this.app.CallService(this.api.GetRegions(this.app.readToken()), ((data: CustomResponseType<Region>) => {
      this.regions = data.dataList;
      this.unselectedRegions = data.dataList;
      this.gates.forEach(gate => {
        this.unselectedRegions = this.unselectedRegions.filter(f=>f.regionCode!=gate.regionCode);
      });
      this.cd.detectChanges();
    }));

  }

  protected GetRightGates() {
    return this.gates.filter(gate => gate.gateNumber % 2 == 0);
  }

  protected GetLeftGates() {
    return this.gates.filter(gate => gate.gateNumber % 2 == 1);
  }

  protected SetSessionGates() {

    this.app.CallService(this.api.SetSessionGates(this.app.readToken(), this.gates), ((data: CustomResponseType<boolean>) => {
      this.app.Snack_Green('خروجی ها با موفقیت ثبت شدند');
    }));
  }

  protected ClearSessionGates() {
this.gates.forEach(gate => {
  if (gate.regionCode!=null){
    this.unselectedRegions.push(this.regions.filter(f=>f.regionCode==gate.regionCode)[0]);
    gate.regionCode = null;
    gate.regionTitle = null;
  }
})
  }

  protected openClusterDialog(gate: Gate) {
    const dialogRef = this.dialog.open(GateSelectorDialog, {
      width: '800px',
      height:'800px',
      panelClass: 'gate-selector-dialog',
      data: {
        gate: gate,
        regions: this.unselectedRegions
      }
    });

    dialogRef.afterClosed().subscribe((result: Region | null) => {
      if (!result) return;

      gate.regionCode = result.regionCode;
      gate.regionTitle = result.regionTitle;

      // حذف مقصد از لیست آزاد
      this.unselectedRegions = this.unselectedRegions.filter(f => f.regionCode !== result.regionCode);
      this.cd.detectChanges();
    });
  }

  protected clearGateCluster(gate: Gate) {
    this.unselectedRegions.push(this.regions.filter(f=>f.regionCode==gate.regionCode)[0]);
    gate.regionCode = null;
    gate.regionTitle = null;
    this.cd.detectChanges();
  }

  protected AutoSetGates() {

    // 1️⃣ آزاد کردن همه Gateها
    this.gates.forEach(gate => {
      gate.regionCode = null;
      gate.regionTitle = null;
    });

    // 2️⃣ ریست Regionهای آزاد و مرتب بر اساس تعداد بسته‌ها (بیشترین به کمترین)
    this.unselectedRegions = [...this.regions]
      .sort((a, b) => b.parcelCount - a.parcelCount);

    // 3️⃣ گیت‌های بدون مقصد با اولویت GateAddress == 1
    const freeGates = [...this.gates]
      .sort((a, b) => Number(a.gateAddress - b.gateAddress));

    if (freeGates.length === 0) return;
    if (this.unselectedRegions.length === 0) return;

    let regionIndex = 0;
    for (let gate of freeGates) {

      if (regionIndex >= this.unselectedRegions.length) {
        break;
      }

      const region = this.unselectedRegions[regionIndex];

      gate.regionCode = region.regionCode;
      gate.regionTitle = region.regionTitle;

      regionIndex++;
    }

    // 4️⃣ حذف Regionهای مصرف‌شده
    this.unselectedRegions = this.unselectedRegions.slice(regionIndex);

    this.cd.detectChanges();
    this.app.Snack_Green('خروجی ها با موفقیت تنظیم شدند');
  }



  // private async GetSessionGates() {
  //   this.app.CallService(this.api.GetCurrentSessionGates(this.app.readToken()), ((data: CustomResponseType<SessionGate>) => {
  //     let oldSessionGates = data.dataList;
  //     oldSessionGates.forEach((gate: SessionGate) => {
  //         if (gate.regionCode != "") {
  //           let sessionGate = this.sessionGates.filter(f => f.gateId == gate.gateId)[0];
  //           sessionGate.regionCode = gate.regionCode;
  //           console.log(sessionGate);
  //           this.cd.detectChanges();
  //         }
  //       }
  //     );
  //     console.log(this.sessionGates);
  //   }));
  // }
  //
  // protected getSessionGate(gate: Gate): SessionGate | undefined {
  //   return this.sessionGates.find(sg => sg.gateId === gate.id);
  // }


  protected GetGateClusterTitle(gate: Gate) {
    if (gate.regionCode && this.regions?.length) {
      const region = this.regions.find(f => f.regionCode === gate.regionCode);
      if (!region) return 'فاقد مقصد';

      return `${gate.regionTitle} \u202B(${gate.regionCode})\u202C - ${region.parcelCount} بسته`;

    }
    return 'فاقد مقصد';
  }
}
