import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-pop-up-message',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-message.component.html',
  styleUrl: './pop-up-message.component.css',
})
export class PopUpMessageComponent {
  toastService = inject(ToastService);

  showMessage = this.toastService.showMessage;
  messageTitle = this.toastService.messageTitle;
  messageDescription = this.toastService.messageDescription;
  messageConfirmation = this.toastService.messageConfirmation;
}
