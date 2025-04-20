import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, signal, Signal } from '@angular/core';
import { IChangeRequest } from '../../interfaces/ChangeRequest';
import { ChangeRequestService } from '../../services/change-request.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CostEstimateFormComponent } from '../cost-estimate-form/cost-estimate-form.component';
import { ICostEstimate } from '../../interfaces/CostEstimate';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cost-estimate-table',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, CostEstimateFormComponent],
  templateUrl: './cost-estimate-table.component.html',
  styleUrl: './cost-estimate-table.component.css',
})
export class CostEstimateTableComponent {
  @Input() costEstimationList: Signal<any> = signal([]);

  changeRequestService = inject(ChangeRequestService);
  userService = inject(UserService);
  toastService = inject(ToastService);
  showForm = false;

  itemToUpdate!: ICostEstimate;

  editItem(item: ICostEstimate) {
    this.itemToUpdate = item;
    this.showForm = true;
  }

  deleteItem(item: ICostEstimate) {
    this.itemToUpdate = item;

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const requestItem: IChangeRequest = {
      _id: '',
      prediction_id: this.itemToUpdate.id,
      request_type: 'Eliminación',
      user_id: this.userService.userData()._id,
      date: formattedDate,
      original_prediction_object: this.itemToUpdate,
      new_prediction_object: this.itemToUpdate,
      status: 'Pendiente',
    };

    this.changeRequestService.createChangeRequest(requestItem).subscribe({
      next: (res) => {
        this.toastService.showToast.set(true);
        this.toastService.toastType.set('toast-success');
        this.toastService.toastMessage.set(
          'Solicitud de eliminación de estimación de costo creada correctamente.'
        );
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
