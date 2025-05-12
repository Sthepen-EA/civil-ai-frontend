import { Component, inject } from '@angular/core';
import { UserInstructionsComponent } from './components/user-instructions/user-instructions.component';
import { CostEstimateTableComponent } from './components/cost-estimate-table/cost-estimate-table.component';
import { CostEstimateFormComponent } from './components/cost-estimate-form/cost-estimate-form.component';
import { NgClass } from '@angular/common';
import { CostEstimateService } from './services/cost-estimate.service';
import { UserService } from '../user/services/user.service';

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

  costEstimationList = this.costEstimateService.costEstimationList;
  showForm = false;
  showEstimationTable = false;

  ngOnInit(): void {
    this.setCostEstimationList();
  }

  setCostEstimationList() {
    const userData = this.userService.userData();

    if (userData.role === 'user') {
      this.costEstimateService
        .getCostEstimationsbyUser(userData._id)
        .subscribe((data) => {
          this.costEstimateService.costEstimationList.set(data);
        });
    } else {
      this.costEstimateService.getAndSetCostEstimationList();
    }
  }

  openForm() {
    this.showForm = !this.showForm;
  }
}
