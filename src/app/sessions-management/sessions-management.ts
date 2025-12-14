import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {App} from '../app';
import {Api} from '../api';
import {ClusterService} from '../services/cluster-service';
import {CustomResponseType} from '../models/custom-response-type.model';
import {ManagementButtonsComponent} from '../shared/management-buttons/management-buttons.component';
import {MaterialTableComponent} from '../shared/material-table/material-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Gate} from '../models/gate.model';
import {Session} from '../models/session.model';
import {CustomButton} from '../shared/material-table/CustomButton';
import {routes} from '../app.routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sessions-management',
  imports: [
    ManagementButtonsComponent,
    MaterialTableComponent,
    ReactiveFormsModule
  ],
  templateUrl: './sessions-management.html',
  styleUrl: './sessions-management.less',
})
export class SessionsManagement implements AfterViewInit {

  constructor(public app: App
    , public api: Api
    , private clusterService: ClusterService
    , private cd: ChangeDetectorRef
    , private router: Router) {
  }

  ngAfterViewInit(): void {
    this.GetSessions();
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

  protected session: Session = new Session();
  SessionType = Session;
  sessions: Session[] = [];


  public GetSessions() {
    this.app.CallService(this.api.GetSessions(this.app.readToken()), ((data: CustomResponseType<Session>) => {
      this.sessions = data.dataList;
      this.cd.detectChanges();
      console.log(this.sessions);
    }));
  }

  public AddSession() {
    this.app.CallService(this.api.AddSession(this.app.readToken(), this.session), ((data: CustomResponseType<Session>) => {
      this.session = new Session();
      this.GetSessions();
      this.cd.detectChanges();
    }));
  }

  customDeleteMessage = (item: any) =>
    "1111";

  protected DeleteSession(session: Session) {
    this.app.CallService(this.api.DeleteSession(this.app.readToken(), session), ((data: CustomResponseType<Session>) => {
      this.GetSessions();
      this.cd.detectChanges();
    }));
  }

  protected SessionButtons() {
    let customButtons: CustomButton[] = [];
    customButtons.push(new CustomButton( 'fa fa-play green-color fa-2x mx-2', (session: Session) => {
        this.app.CallService(this.api.StartSession(this.app.readToken(), session), ((data: CustomResponseType<Session>) => {
          this.GetSessions();
          this.cd.detectChanges();
        }));
      }, (data) => {
        return this.ShowStartButton(data);
      })
    )
    customButtons.push(new CustomButton( 'fa fa-stop red-color fa-2x mx-2', (session: Session) => {
        this.app.CallService(this.api.StopSession(this.app.readToken(), session), ((data: CustomResponseType<Session>) => {
          this.GetSessions();
          this.cd.detectChanges();
        }));
      }, (data) => {
        return this.ShowStopButton(data);
      })
    )

    customButtons.push(new CustomButton('fa fa-outdent fa-2x mx-2', (session: Session) => {
        this.router.navigate(['/sessionGatesManagement', session.id]);
      }, (data) => {
        return this.ShowGatesButton(data);
      })
    )

     return customButtons;
  }

  private ShowStartButton(data: Session) {
    return data.startDateTime == null;
  }

  private ShowStopButton(data: Session) {
    return data.startDateTime != null && data.endDateTime == null;
  }
  private ShowGatesButton(data: Session) {
    return data.startDateTime != null && data.endDateTime == null;
  }

  private DeleteGatesButton(data: Session) {
    return data.startDateTime == null && data.endDateTime == null;
  }

  protected AllowUpload() {
    return this.sessions.filter((f)=>f.startDateTime==null && f.endDateTime==null).length>0;
  }
}
