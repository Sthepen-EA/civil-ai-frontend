import { Routes } from '@angular/router';
import { CostEstimateComponent } from './pages/cost-estimate/cost-estimate.component';
import { ChangeRequestComponent } from './pages/change-request/change-request.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cost-estimate',
    pathMatch: 'full',
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
