import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast = signal(false);
  toastType = signal('');
  toastMessage = signal('');

  showMessage = signal(false);
  messageTitle = signal('');
  messageDescription = signal('');
  messageConfirmation = signal(false);

  resetMessageInputs() {
    this.showMessage.set(false);
    this.messageTitle.set('');
    this.messageDescription.set('');
    this.messageConfirmation.set(false);
  }
}
