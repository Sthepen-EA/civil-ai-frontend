import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChangeRequestService {
  http: HttpClient = inject(HttpClient);

  api_url = environment.api_url + 'request';

  getChangeRequests() {
    return this.http.get(this.api_url);
  }

  constructor() {}
}
