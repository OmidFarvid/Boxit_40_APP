import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Cluster} from '../models/cluster.model';
import {ManagementButtonsComponent} from '../shared/management-buttons/management-buttons.component';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {App} from '../app';
import {Api} from '../api';
import {ClusterService} from '../services/cluster-service';
import {MaterialTableComponent} from '../shared/material-table/material-table.component';
import {CustomResponseType} from '../models/custom-response-type.model';

@Component({
  selector: 'app-clusters-management',
  standalone: true,
  imports: [
    FormsModule,
    ManagementButtonsComponent,
    MaterialTableComponent
  ],
  templateUrl: './clusters-management.html',
  styleUrl: './clusters-management.less',
})
export class ClustersManagement implements OnInit {
  async ngOnInit() {
    this.GetClusters();
  }

  constructor(public app: App
    , public api: Api
    , private clusterService: ClusterService
    , private cd: ChangeDetectorRef) {
  }

  protected cluster: Cluster = new Cluster();
  ClusterType = Cluster;
  clusters: Cluster[] = [];

  protected AddCluster() {

    this.clusterService.addCluster(this.cluster, this.app.readToken()).subscribe({
      next: res => {
        alert('Cluster اضافه شد. ID: ' + res.id);
        this.cluster = new Cluster();
      },
      error: err => {
        console.error(err);
        alert('خطا در افزودن Cluster');
      }
    });
  }

  public GetClusters() {
    this.app.CallService(this.api.GetClusters(this.app.readToken()), ((data: CustomResponseType<Cluster>) => {
      this.clusters = data.dataList;
      this.cd.detectChanges();
      console.log(this.clusters);
    }));
  }

  customDeleteMessage = (item: any) =>
    `آیا مایل به حذف ${item.clusterTitle} میباشید؟`;
}

