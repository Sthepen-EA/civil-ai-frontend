import { Component, inject, signal } from '@angular/core';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';
import { UserIconComponent } from '../../icons/user-icon/user-icon.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserTableComponent, UserFormComponent, UserIconComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userService: UserService = inject(UserService);

  userList = this.userService.userList;
  showForm = false;
  itemToUpdate!: any;

  ngOnInit(): void {
    this.setuserList();
  }

  setuserList() {
    this.userService.getAndSetUserList();
  }

  openForm() {
    this.showForm = !this.showForm;
    this.itemToUpdate = null;
  }

  sendChangeItem(item: any) {
    this.showForm = true;
    this.itemToUpdate = item;
  }
}
