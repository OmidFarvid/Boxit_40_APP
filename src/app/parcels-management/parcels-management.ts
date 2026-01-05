import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {MaterialTableComponent} from "../shared/material-table/material-table.component";
import {Session} from '../models/session.model';
import {Parcel} from '../models/parcel.model';
import {App} from '../app';
import {Api} from '../api';
import {GateService} from '../services/gate-service';
import {ClusterService} from '../services/cluster-service';
import {SessionService} from '../services/session-service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomResponseType} from '../models/custom-response-type.model';

@Component({
  selector: 'app-parcels-management',
  imports: [
    MaterialTableComponent
  ],
  templateUrl: './parcels-management.html',
  styleUrl: './parcels-management.less',
})
export class ParcelsManagement implements AfterViewInit {
  private session: Session;
  public parcels: Parcel[] = [];
  public ParcelType = Parcel;

  constructor(public app: App
    , public api: Api
    , private gateService: GateService
    , private clusterService: ClusterService
    , private sessionService: SessionService
    , private cdr: ChangeDetectorRef
    , private route: ActivatedRoute
    , private router: Router) {
  }

  async ngAfterViewInit(): Promise<void> {
    let sessionId = this.route.snapshot.paramMap.get('id');

    this.sessionService.GetParcels(this.app, this.session?.id, (data: CustomResponseType<Parcel>) => {
   this.parcels = data.dataList;
   this.cdr.detectChanges();
    });
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;

      const bytes = Array.from(new Uint8Array(arrayBuffer));

      this.app.CallService(
        this.api.UploadExcel(this.app.readToken(), {bytes}),
        (data: any) => {
          console.log("Uploaded:", data);
        }
      );
    };

    reader.readAsArrayBuffer(file);
  }

}
