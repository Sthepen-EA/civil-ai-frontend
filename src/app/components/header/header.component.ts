import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { initialUser } from '../../interfaces/User';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userService = inject(UserService);
  router = inject(Router);
  toastService = inject(ToastService);

  isUserLoggedIn = this.userService.isUserLoggedIn;
  userLoggedData = this.userService.userData;

  headerItemAdminList = [
    { name: 'Estimaciones', url: '/cost-estimate' },
    { name: 'Solicitudes de cambio', url: '/change-request' },
    { name: 'Usuarios', url: '/user' },
  ];

  headerItemUserList = [
    { name: 'Estimaciones', url: '/cost-estimate' },
    { name: 'Solicitudes de cambio', url: '/change-request' },
  ];

  ngOnInit() {
    this.userService.checkIfUserLoggedIn();
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/log-in']);
    this.userService.isUserLoggedIn.set(false);
  }
}
