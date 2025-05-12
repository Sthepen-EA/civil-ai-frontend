import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { QuestionIconComponent } from '../../icons/question-icon/question-icon.component';
import { MessageIconComponent } from '../../icons/message-icon/message-icon.component';
import { LogOutIconComponent } from '../../icons/log-out-icon/log-out-icon.component';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UserService } from '../../pages/user/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    QuestionIconComponent,
    MessageIconComponent,
    LogOutIconComponent,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userService = inject(UserService);
  router = inject(Router);
  toastService = inject(ToastService);
  route = inject(ActivatedRoute);

  isUserLoggedIn = this.userService.isUserLoggedIn;
  userLoggedData = this.userService.userData;

  activeItem = '';
  url = this.route.url;

  headerItemAdminList = [
    { name: 'Estimaciones', url: '/estimaciones' },
    { name: 'Solicitudes', url: '/solicitudes' },
    { name: 'Usuarios', url: '/usuarios' },
  ];

  headerItemUserList = [
    { name: 'Estimaciones', url: '/estimaciones' },
    { name: 'Solicitudes', url: '/solicitudes' },
  ];

  ngOnInit() {
    this.userService.checkIfUserLoggedIn();
    this.setActiveItem();
  }

  redirect(url: string) {
    this.activeItem = url;
    this.router.navigate([url]);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.userService.isUserLoggedIn.set(false);
  }

  setActiveItem() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        this.activeItem = currentUrl;
      });
  }
}
