import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  api_url = environment.api_url + 'user';

  getUsers() {
    return this.http.get(this.api_url);
  }
  constructor() {}
}
