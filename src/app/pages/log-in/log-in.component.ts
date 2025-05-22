import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { UserService } from '../user/services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  toastService = inject(ToastService);
  userService = inject(UserService);
  route = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading = false;

  sendForm() {
    if (this.form.invalid) {
      const controls = this.form.controls;

      if (controls.email.errors?.['email']) {
        this.toastService.showToast.set(true);
        this.toastService.toastType.set('toast-error');
        this.toastService.toastMessage.set('Ingrese un correo válido.');
        return;
      }
      this.toastService.showToast.set(true);
      this.toastService.toastType.set('toast-error');
      this.toastService.toastMessage.set('Credenciales incorrectas.');
      return;
    } else {
      this.isLoading = true;
      setTimeout(() => {
        this.userService.logIn(this.form.value).subscribe(
          (res) => {
            const userData = (res as any).user;

            if (!(res as any).success) {
              this.toastService.showToast.set(true);
              this.toastService.toastType.set('toast-error');
              this.toastService.toastMessage.set('Credenciales incorrectas.');
              this.isLoading = false;
            } else {
              if (userData.state !== 'Activo') {
                this.toastService.showToast.set(true);
                this.toastService.toastType.set('toast-error');
                this.toastService.toastMessage.set('Cuenta inactiva.');
                this.isLoading = false;
                return;
              }

              this.form.reset();
              this.toastService.showToast.set(true);
              this.toastService.toastType.set('toast-success');
              this.toastService.toastMessage.set(
                `Ha iniciado sesión correctamente como "${userData.role.toUpperCase()}".`
              );
              this.route.navigate(['/estimaciones']);
              this.userService.setUserData(userData);
            }
          },
          (err) => {
            this.toastService.showToast.set(true);
            this.toastService.toastType.set('toast-error');
            this.toastService.toastMessage.set('Credenciales incorrectas.');
            this.isLoading = false;
          }
        );
      }, 1000);
    }
  }
}
