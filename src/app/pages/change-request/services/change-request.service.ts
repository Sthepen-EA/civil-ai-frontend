import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IChangeRequest } from '../../../interfaces/ChangeRequest';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestService {
  http: HttpClient = inject(HttpClient);

  api_url = environment.api_url + 'request';

  changeRequestList = signal<any>([]);

  getChangeRequests() {
    return this.http.get(this.api_url);
  }

  getChangeRequestsbyUser(userId: string) {
    return this.http.get(this.api_url + '-by-user/' + userId);
  }

  createChangeRequest(item: IChangeRequest) {
    return this.http.post(this.api_url + '/create', item);
  }

  updateChangeRequest(item: any) {
    return this.http.put(this.api_url + '/' + item._id, item);
  }

  getAndSetChangeRequestList() {
    this.getChangeRequests().subscribe((data) => {
      this.changeRequestList.set(data);
      console.log(data);
    });
  }
}
