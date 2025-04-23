import { Component, inject, signal } from '@angular/core';
import { ChangeRequestService } from '../../services/change-request.service';
import { ChangeRequestTableComponent } from '../../components/change-request-table/change-request-table.component';
import { ChangeRequestFormComponent } from '../../components/change-request-form/change-request-form.component';
import { UserService } from '../../services/user.service';

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

  changeRequestList = signal<any>([]);
  showForm = false;
  itemSelected: any;

  ngOnInit(): void {
    this.setchangeRequestList();
  }

  setchangeRequestList() {
    const userData = this.userService.userData();

    if (userData.role === 'user') {
      this.changeRequestService
        .getChangeRequestsbyUser(userData._id)
        .subscribe((data) => {
          this.changeRequestList.set(data);
        });
    } else {
      this.changeRequestService.getChangeRequests().subscribe((data) => {
        this.changeRequestList.set(data);
      });
    }
  }

  openForm() {
    this.showForm = !this.showForm;
  }

  sendChangeItem(item: any) {
    this.itemSelected = item;
    this.showForm = true;
  }
}
