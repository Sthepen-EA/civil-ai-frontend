import { Routes } from '@angular/router';
import { CostEstimateComponent } from './pages/cost-estimate/cost-estimate.component';
import { ChangeRequestComponent } from './pages/change-request/change-request.component';
import { UserComponent } from './pages/user/user.component';
import { LogInComponent } from './pages/log-in/log-in.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Log in',
    component: LogInComponent,
  },
  {
    path: 'estimaciones',
    title: 'Cost Estimate',
    component: CostEstimateComponent,
  },
  {
    path: 'solicitudes',
    title: 'Change Request',
    component: ChangeRequestComponent,
  },
  {
    path: 'usuarios',
    title: 'User',
    component: UserComponent,
  },
];
