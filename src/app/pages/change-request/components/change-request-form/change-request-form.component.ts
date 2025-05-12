import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CloseIconComponent } from '../../../../icons/close-icon/close-icon.component';

@Component({
  selector: 'app-change-request-form',
  standalone: true,
  imports: [CurrencyPipe, CloseIconComponent],
  templateUrl: './change-request-form.component.html',
  styleUrl: './change-request-form.component.css',
})
export class ChangeRequestFormComponent {
  @Input() itemSelected: any;
  @Output() showForm = new EventEmitter<boolean>();

  atributos: any[] = [
    {
      name: 'structureType',
      label: 'Tipo de estructura',
    },
    {
      name: 'abutmentType',
      label: 'Tipo de columna',
    },
    {
      name: 'number_of_Spans',
      label: 'Número de tramos',
    },
    {
      name: 'total_Width',
      label: 'Ancho total',
    },
    {
      name: 'total_Length',
      label: 'Longitud total',
    },
    {
      name: 'year',
      label: 'Año',
    },
    {
      name: 'total_Cost',
      label: 'Costo total',
    },
  ];

  closeForm() {
    this.showForm.emit(false);
  }
}
