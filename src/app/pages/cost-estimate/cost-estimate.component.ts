import { Component, inject, signal } from '@angular/core';
import { CostEstimateService } from '../../services/cost-estimate.service';
import { CostEstimateTableComponent } from '../../components/cost-estimate-table/cost-estimate-table.component';
import { CostEstimateFormComponent } from '../../components/cost-estimate-form/cost-estimate-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cost-estimate',
  standalone: true,
  imports: [CostEstimateTableComponent, CostEstimateFormComponent],
  templateUrl: './cost-estimate.component.html',
  styleUrl: './cost-estimate.component.css',
})
export class CostEstimateComponent {
  costEstimateService: CostEstimateService = inject(CostEstimateService);
  userService: UserService = inject(UserService);

  costEstimationList = signal<any>([]);
  showForm = false;

  ngOnInit(): void {
    this.setCostEstimationList();
  }

  setCostEstimationList() {
    const userData = this.userService.userData();

    if (userData.role === 'user') {
      this.costEstimateService
        .getCostEstimationsbyUser(userData._id)
        .subscribe((data) => {
          this.costEstimationList.set(data);
        });
    } else {
      this.costEstimateService.getCostEstimations().subscribe((data) => {
        this.costEstimationList.set(data);
      });
    }
  }

  openForm() {
    this.showForm = !this.showForm;
  }
}
