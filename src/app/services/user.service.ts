import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  api_url = environment.api_url + 'user';
  isUserLoggedIn = signal(false);

  getUsers() {
    return this.http.get(this.api_url);
  }

  logIn(credentials: any) {
    return this.http.post(environment.api_url + 'login', credentials);
  }

  checkIfUserLoggedIn() {
    const token = localStorage.getItem('token');

    if (token) {
      this.isUserLoggedIn.set(true);
    }
  }
}
