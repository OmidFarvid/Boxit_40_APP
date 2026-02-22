import { Routes } from '@angular/router';
// import {ClustersManagement} from './clusters-management/clusters-management';
import {LoginComponent} from './Accounting/login/login';
import {UsersManagement} from './Accounting/users-management/users-management';
import {SessionsManagement} from './sessions-management/sessions-management';
import {GatesManagement} from './gates-management/gates-management';
import {SessionDetailComponent} from './session-detail/session-detail.component';
import {GatesRegionManagement} from './session-gates-management/gates-region-management.component';
import {ParcelsManagement} from './parcels-management/parcels-management';
import {MonitoringComponent} from './monitoring-component/monitoring-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:"usersManagement",component:UsersManagement},
  // {path:"clusterManagement",component:ClustersManagement},
  {path:"gatesRegionManagement",component:GatesRegionManagement},
  {path:"parcelsManagement",component:ParcelsManagement},
  {path:"monitoringComponent",component:MonitoringComponent},

  {path:"gatesManagement",component:GatesManagement},
  {path:"sessionDetail/:id",component:SessionDetailComponent},
];
