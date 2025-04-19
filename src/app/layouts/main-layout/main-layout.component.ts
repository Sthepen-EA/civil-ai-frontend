import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, ToastComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
