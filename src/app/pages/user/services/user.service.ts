import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { initialUser } from '../../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);

  api_url = environment.api_url + 'user';
  isUserLoggedIn = signal(false);
  userData = signal(initialUser);

  userList = signal<any>([]);

  getUsers() {
    return this.http.get(this.api_url);
  }

  logIn(credentials: any) {
    return this.http.post(environment.api_url + 'login', credentials);
  }

  createUser(user: any) {
    return this.http.post(this.api_url + '/create', user);
  }

  updateUser(user: any) {
    return this.http.put(this.api_url + '/' + user.id, user);
  }

  deleteUser(id: any) {
    return this.http.delete(this.api_url + '/' + id);
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

  getAndSetUserList() {
    this.getUsers().subscribe((data) => {
      this.userList.set(data);
    });
  }
}
