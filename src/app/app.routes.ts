import { Routes } from '@angular/router';
import {ClustersManagement} from './clusters-management/clusters-management';
import {LoginComponent} from './Accounting/login/login';
import {UsersManagement} from './Accounting/users-management/users-management';
import {SessionsManagement} from './sessions-management/sessions-management';
import {GatesManagement} from './gates-management/gates-management';
import {SessionGatesManagement} from './session-gates-management/session-gates-management';
import {SessionDetail} from './session-detail/session-detail';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:"usersManagement",component:UsersManagement},
  {path:"clusterManagement",component:ClustersManagement},
  {path:"sessionManagement",component:SessionsManagement},
  {path:"gatesManagement",component:GatesManagement},
  {path:"sessionGatesManagement/:id",component:SessionGatesManagement},
  {path:"sessionDetail/:id",component:SessionDetail},
];
