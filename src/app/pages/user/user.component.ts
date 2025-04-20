import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserTableComponent, UserFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userService: UserService = inject(UserService);

  userList = signal<any>([]);
  showForm = false;
  itemToUpdate!: any;

  ngOnInit(): void {
    this.setuserList();
  }

  setuserList() {
    this.userService.getUsers().subscribe((data) => {
      this.userList.set(data);
    });
  }

  openForm() {
    this.showForm = !this.showForm;
  }

  sendChangeItem(item: any) {
    this.showForm = true;
    this.itemToUpdate = item;
  }
}
