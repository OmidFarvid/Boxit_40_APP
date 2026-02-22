import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {ClusterService} from '../services/cluster-service';
import {SessionService} from '../services/session-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Parcel} from '../models/parcel.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-monitoring-component',
  imports: [
    NgClass
  ],
  templateUrl: './monitoring-component.html',
  styleUrl: './monitoring-component.less',
})
export class MonitoringComponent implements AfterViewInit {
  public parcels: Parcel[] = [];

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private clusterService: ClusterService
    , private sessionService: SessionService
    , private cdr: ChangeDetectorRef
    , private route: ActivatedRoute
    , public router: Router) {
  }

  ngAfterViewInit(): void {
    let self = this;
    setInterval(() => {
      self.GetMonitoringParcels()
    }, 1000)
  }

  GetMonitoringParcels() {
    this.api.GetMonitoringParcels(this.app.readToken()).subscribe((data: Parcel[]) => {
      this.parcels = data;
      this.cdr.detectChanges();
    });
  }
}
