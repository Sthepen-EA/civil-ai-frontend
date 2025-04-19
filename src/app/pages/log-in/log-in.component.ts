import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  toastService = inject(ToastService);
  userService = inject(UserService);
  route = inject(Router);

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  sendForm() {
    if (this.form.invalid) {
      console.log('error');
      this.toastService.showToast.set(true);
      this.toastService.toastType.set('toast-error');
      this.toastService.toastMessage.set(
        'Por favor, complete todos los campos.'
      );
    } else {
      this.userService.logIn(this.form.value).subscribe(
        (res) => {
          console.log(res);
          this.form.reset();
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set(
            'Ha iniciado sesión correctamente.'
          );
          this.userService.isUserLoggedIn.set(true);
          this.route.navigate(['/cost-estimate']);

          localStorage.setItem('token', JSON.stringify(res));
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
