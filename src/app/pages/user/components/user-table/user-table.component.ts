import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { EditIconComponent } from '../../../../icons/edit-icon/edit-icon.component';
import { DeleteIconComponent } from '../../../../icons/delete-icon/delete-icon.component';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [EditIconComponent, DeleteIconComponent, NgClass],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  @Input() userList: Signal<any> = signal([]);
  @Output() changeItem = new EventEmitter<any>();

  userService = inject(UserService);
  toastService = inject(ToastService);

  userId = '';

  constructor() {
    effect(() => {
      if (this.toastService.messageConfirmation()) {
        this.userService.deleteUser(this.userId).subscribe({
          next: () => {
            this.toastService.showToast.set(true);
            this.toastService.toastType.set('toast-success');
            this.toastService.toastMessage.set(
              'Usuario eliminado correctamente.'
            );
            this.toastService.resetMessageInputs();
            this.userService.getAndSetUserList();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  editItem(item: any) {
    this.changeItem.emit(item);
  }

  deleteItem(item: any) {
    this.toastService.messageTitle.set('Confirmación de eliminación');
    this.toastService.messageDescription.set(
      '¿Esta seguro que desea eliminar el usuario?'
    );
    this.toastService.showMessage.set(true);
    this.userId = item.id;
  }
}
