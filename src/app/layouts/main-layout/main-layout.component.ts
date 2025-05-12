import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { UserService } from '../../pages/user/services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, ToastComponent, NgClass],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  userService = inject(UserService);

  isUserLoggedIn = this.userService.isUserLoggedIn;
}
