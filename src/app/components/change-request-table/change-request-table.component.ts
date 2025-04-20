import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { IChangeRequest } from '../../interfaces/ChangeRequest';
import { ChangeRequestService } from '../../services/change-request.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-change-request-table',
  standalone: true,
  imports: [],
  templateUrl: './change-request-table.component.html',
  styleUrl: './change-request-table.component.css',
})
export class ChangeRequestTableComponent {
  @Input() changeRequestList: Signal<any> = signal([]);
  @Output() changeItem = new EventEmitter<any>();

  changeRequestService = inject(ChangeRequestService);
  toastService = inject(ToastService);

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
