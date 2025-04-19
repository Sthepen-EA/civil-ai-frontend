import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Output() showForm = new EventEmitter<boolean>();

  atributos: any[] = [
    {
      name: 'name',
      label: 'Nombre',
    },
    {
      name: 'email',
      label: 'Correo',
    },
    {
      name: 'phone',
      label: 'Teléfono',
    },
    {
      name: 'state',
      label: 'Estado',
    },
    {
      name: 'password',
      label: 'Contraseña',
    },
    {
      name: 'role',
      label: 'Rol',
    },
  ];

  closeForm() {
    this.showForm.emit(false);
  }

  sendForm() {
    this.showForm.emit(false);
  }
}
