import { Routes } from '@angular/router';
import { CostEstimateComponent } from './pages/cost-estimate/cost-estimate.component';
import { ChangeRequestComponent } from './pages/change-request/change-request.component';
import { UserComponent } from './pages/user/user.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { userAuthGuard } from './services/user-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    title: 'Log in',
    component: LogInComponent,
  },
  {
    path: 'cost-estimate',
    title: 'Cost Estimate',
    component: CostEstimateComponent,
  },
  {
    path: 'change-request',
    title: 'Change Request',
    component: ChangeRequestComponent,
  },
  {
    path: 'user',
    title: 'User',
    component: UserComponent,
  },
];
