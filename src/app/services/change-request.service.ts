import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IChangeRequest } from '../interfaces/ChangeRequest';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestService {
  http: HttpClient = inject(HttpClient);

  api_url = environment.api_url + 'request';

  getChangeRequests() {
    return this.http.get(this.api_url);
  }

  createChangeRequest(item: IChangeRequest) {
    return this.http.post(this.api_url + '/create', item);
  }

  constructor() {}
}
