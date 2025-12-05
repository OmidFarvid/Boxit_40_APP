import { Routes } from '@angular/router';
import {ClustersManagement} from './clusters-management/clusters-management';
import {LoginComponent} from './Accounting/login/login';
import {UsersManagement} from './Accounting/users-management/users-management';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:"usersManagement",component:UsersManagement},
  {path:"clusterManagement",component:ClustersManagement}
];
