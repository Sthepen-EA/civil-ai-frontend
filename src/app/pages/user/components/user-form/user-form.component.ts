import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { UserService } from '../../services/user.service';
import { CloseIconComponent } from '../../../../icons/close-icon/close-icon.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CloseIconComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() itemToUpdate: any = null;
  @Output() showForm = new EventEmitter<boolean>();

  toastService = inject(ToastService);
  userService = inject(UserService);

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{7,15}$'),
    ]),
    state: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    role: new FormControl('', Validators.required),
  });

  closeForm() {
    this.showForm.emit(false);
  }

  ngOnChanges(): void {
    if (this.itemToUpdate) {
      this.form.patchValue(this.itemToUpdate);
    }
  }
  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      const controls = this.form.controls;

      for (const key in controls) {
        const control = controls[key as keyof typeof controls];
        if (control.invalid) {
          const errors = control.errors;

          if (errors?.['required']) {
            this.showToastError(
              `El campo "${this.getLabel(key)}" es obligatorio.`
            );
          }
          if (errors?.['minlength']) {
            this.showToastError(
              `"${this.getLabel(key)}" debe tener al menos ${
                errors['minlength'].requiredLength
              } caracteres.`
            );
          }
          if (errors?.['email']) {
            this.showToastError(
              `"${this.getLabel(key)}" no es un correo válido.`
            );
          }
          if (errors?.['pattern']) {
            this.showToastError(
              `"${this.getLabel(key)}" tiene un formato incorrecto.`
            );
          }
        }
      }

      return;
    } else if (this.itemToUpdate) {
      this.userService.updateUser(this.form.value).subscribe({
        next: () => {
          this.closeForm();
          this.form.reset();
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set('Usuario editado  correctamente.');
          this.userService.getAndSetUserList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.userService.createUser(this.form.value).subscribe({
        next: () => {
          this.closeForm();
          this.form.reset();
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set('Usuario creado correctamente.');
          this.userService.getAndSetUserList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  showToastError(message: string) {
    this.toastService.showToast.set(true);
    this.toastService.toastType.set('toast-error');
    this.toastService.toastMessage.set(message);
  }

  getLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      email: 'Correo',
      phone: 'Teléfono',
      state: 'Estado',
      password: 'Contraseña',
      role: 'Rol',
    };

    return labels[field] || field;
  }
}
