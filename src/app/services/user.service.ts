import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { initialUser } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  api_url = environment.api_url + 'user';
  isUserLoggedIn = signal(false);
  userData = signal(initialUser);

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
      this.userData.set(JSON.parse(token));
      this.isUserLoggedIn.set(true);
    } else {
      this.isUserLoggedIn.set(false);
    }
  }

  setUserData(data: any) {
    this.userData.set(data);
    this.isUserLoggedIn.set(true);
    localStorage.setItem('token', JSON.stringify(data));
  }
}
