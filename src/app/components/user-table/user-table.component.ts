import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  @Input() userList: Signal<any> = signal([]);
  @Output() changeItem = new EventEmitter<any>();

  userService = inject(UserService);
  toastService = inject(ToastService);

  editItem(item: any) {
    this.changeItem.emit(item);
  }
  deleteItem(item: any) {
    this.userService.deleteUser(item.id).subscribe({
      next: () => {
        this.toastService.showToast.set(true);
        this.toastService.toastType.set('toast-success');
        this.toastService.toastMessage.set('Usuario eliminado correctamente.');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
