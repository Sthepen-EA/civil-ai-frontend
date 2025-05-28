import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { CheckIconComponent } from '../../../../icons/check-icon/check-icon.component';
import { DeclineIconComponent } from '../../../../icons/decline-icon/decline-icon.component';
import { ToastService } from '../../../../services/toast.service';
import { ChangeRequestService } from '../../services/change-request.service';
import { UserService } from '../../../user/services/user.service';
import { SearchiconComponent } from '../../../cost-estimate/icons/searchicon/searchicon.component';
import { IChangeRequest } from '../../../../interfaces/ChangeRequest';

@Component({
  selector: 'app-change-request-table',
  standalone: true,
  imports: [
    CheckIconComponent,
    DeclineIconComponent,
    NgClass,
    SearchiconComponent,
  ],
  templateUrl: './change-request-table.component.html',
  styleUrl: './change-request-table.component.css',
})
export class ChangeRequestTableComponent {
  @Output() changeItem = new EventEmitter<any>();

  changeRequestService = inject(ChangeRequestService);
  toastService = inject(ToastService);
  userService = inject(UserService);

  changeRequestList = this.changeRequestService.changeRequestList;
  searchTerm = signal('');

  constructor() {
    effect(() => {
      if (this.changeRequestList().length === 0) {
        this.toastService.showMessage.set(true);
        this.toastService.messageTitle.set('Solicitudes de cambio vacios.');
        this.toastService.messageDescription.set(
          'No se encontraron solicitudes de cambios registradas.'
        );
      }
    });
  }

  filteredChangeRequests = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    // if (!isNaN(Number(term))) {
    //   return this.changeRequestList();
    // }

    return this.changeRequestList().filter((item: IChangeRequest) => {
      return (
        item.user_name.toLowerCase().includes(term) ||
        item.request_type.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term) ||
        item.project_id.toLowerCase().includes(term)
      );
    });
  });

  ngOnInit(): void {
    this.setchangeRequestList();
  }

  setchangeRequestList() {
    const userData = this.userService.userData();

    if (userData.role === 'user') {
      this.changeRequestService
        .getChangeRequestsbyUser(userData._id)
        .subscribe((data) => {
          this.changeRequestList.set(data);
        });
    } else {
      this.changeRequestService.getAndSetChangeRequestList();
    }
  }

  showCostEstimation(item: any) {
    this.changeItem.emit(item);
  }

  approveRequest(item: any) {
    if (item.status === 'Pendiente') {
      const requestItem = { ...item };
      requestItem.status = 'Aprobado';
      requestItem._id = requestItem.id;
      delete requestItem.id;

      this.changeRequestService.updateChangeRequest(requestItem).subscribe({
        next: (res) => {
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set(
            'Solicitud aprobada correctamente.'
          );
          this.changeRequestService.getAndSetChangeRequestList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.toastService.showToast.set(true);
      this.toastService.toastType.set('toast-error');
      this.toastService.toastMessage.set(
        `Solicitud ya respondida. Estado: "${item.status}".`
      );
    }
  }

  rejectRequest(item: any) {
    if (item.status === 'Pendiente') {
      const requestItem = { ...item };
      requestItem.status = 'Rechazado';
      requestItem._id = requestItem.id;
      delete requestItem.id;

      delete requestItem.id;

      this.changeRequestService.updateChangeRequest(requestItem).subscribe({
        next: (res) => {
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set(
            'Solicitud rechazada correctamente.'
          );
          this.changeRequestService.getAndSetChangeRequestList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.toastService.showToast.set(true);
      this.toastService.toastType.set('toast-error');
      this.toastService.toastMessage.set(
        `Solicitud ya respondida. Estado: "${item.status}".`
      );
    }
  }
}
