import { Component, effect, inject } from '@angular/core';
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

  constructor() {
    effect(() => {
      if (this.showToast()) {
        setTimeout(() => {
          this.closeToast();
        }, 3000);
      }
    });
  }

  closeToast() {
    this.toastService.showToast.set(false);
  }
}
