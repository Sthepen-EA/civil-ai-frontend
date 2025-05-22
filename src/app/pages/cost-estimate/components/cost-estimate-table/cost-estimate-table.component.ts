import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CostEstimateFormComponent } from '../cost-estimate-form/cost-estimate-form.component';
import { ToastService } from '../../../../services/toast.service';
import { ICostEstimate } from '../../../../interfaces/CostEstimate';
import { IChangeRequest } from '../../../../interfaces/ChangeRequest';
import { EditIconComponent } from '../../../../icons/edit-icon/edit-icon.component';
import { DeleteIconComponent } from '../../../../icons/delete-icon/delete-icon.component';
import { ChangeRequestService } from '../../../change-request/services/change-request.service';
import { UserService } from '../../../user/services/user.service';
import { CostEstimateService } from '../../services/cost-estimate.service';
import { SearchiconComponent } from '../../icons/searchicon/searchicon.component';

@Component({
  selector: 'app-cost-estimate-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    CostEstimateFormComponent,
    EditIconComponent,
    DeleteIconComponent,
    SearchiconComponent,
  ],
  templateUrl: './cost-estimate-table.component.html',
  styleUrl: './cost-estimate-table.component.css',
})
export class CostEstimateTableComponent {
  changeRequestService = inject(ChangeRequestService);
  userService = inject(UserService);
  toastService = inject(ToastService);
  costEstimateService = inject(CostEstimateService);
  showForm = false;

  itemToUpdate!: ICostEstimate;
  costEstimationList = this.costEstimateService.costEstimationList;

  updatePermission = false;
  searchTerm = signal('');

  constructor() {
    effect(() => {
      if (this.updatePermission) {
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
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  filteredEstimates = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    // if (!isNaN(Number(term))) {
    //   return this.costEstimationList();
    // }

    return this.costEstimationList().filter((item: any) => {
      const { structureType, abutmentType } = item.input_list;

      return (
        structureType.toLowerCase().includes(term) ||
        abutmentType.toLowerCase().includes(term)
      );
    });
  });

  ngAfterViewInit(): void {
    if (this.costEstimationList().length === 0) {
      this.toastService.showMessage.set(true);
      this.toastService.messageTitle.set('Historial de estimaciones vacio.');
      this.toastService.messageDescription.set(
        'No se encontraron estimaciones registradas.'
      );
    }
  }

  editItem(item: ICostEstimate) {
    this.itemToUpdate = item;
    this.showForm = true;
  }

  deleteItem(item: ICostEstimate) {
    this.itemToUpdate = item;
    this.updatePermission = true;
  }
}
