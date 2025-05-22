import { Component, inject } from '@angular/core';
import { UserInstructionsComponent } from './components/user-instructions/user-instructions.component';
import { CostEstimateTableComponent } from './components/cost-estimate-table/cost-estimate-table.component';
import { CostEstimateFormComponent } from './components/cost-estimate-form/cost-estimate-form.component';
import { NgClass } from '@angular/common';
import { CostEstimateService } from './services/cost-estimate.service';
import { UserService } from '../user/services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cost-estimate',
  standalone: true,
  imports: [
    CostEstimateTableComponent,
    CostEstimateFormComponent,
    UserInstructionsComponent,
    NgClass,
  ],
  templateUrl: './cost-estimate.component.html',
  styleUrl: './cost-estimate.component.css',
})
export class CostEstimateComponent {
  costEstimateService: CostEstimateService = inject(CostEstimateService);
  userService: UserService = inject(UserService);
  toastService: ToastService = inject(ToastService);

  showForm = false;
  showEstimationTable = false;

  openForm() {
    this.showForm = !this.showForm;
  }
}
