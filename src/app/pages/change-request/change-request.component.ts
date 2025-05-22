import { Component, inject, signal } from '@angular/core';
import { ChangeRequestFormComponent } from './components/change-request-form/change-request-form.component';
import { ChangeRequestTableComponent } from './components/change-request-table/change-request-table.component';
import { ChangeRequestService } from './services/change-request.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-change-request',
  standalone: true,
  imports: [ChangeRequestTableComponent, ChangeRequestFormComponent],
  templateUrl: './change-request.component.html',
  styleUrl: './change-request.component.css',
})
export class ChangeRequestComponent {
  changeRequestService: ChangeRequestService = inject(ChangeRequestService);
  userService: UserService = inject(UserService);

  showForm = false;
  itemSelected: any;

  openForm() {
    this.showForm = !this.showForm;
  }

  sendChangeItem(item: any) {
    this.itemSelected = item;
    this.showForm = true;
  }
}
