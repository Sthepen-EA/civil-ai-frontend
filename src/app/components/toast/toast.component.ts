import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toastService = inject(ToastService);

  showToast = this.toastService.showToast;
  toastType = this.toastService.toastType;
  toastMessage = this.toastService.toastMessage;

  closeToast() {
    this.toastService.showToast.set(false);
  }
}
