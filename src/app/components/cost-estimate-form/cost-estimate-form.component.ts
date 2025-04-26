import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CostEstimateService } from '../../services/cost-estimate.service';
import { ICostEstimate, IInputListItem } from '../../interfaces/CostEstimate';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ChangeRequestService } from '../../services/change-request.service';
import { IChangeRequest } from '../../interfaces/ChangeRequest';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cost-estimate-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './cost-estimate-form.component.html',
  styleUrl: './cost-estimate-form.component.css',
})
export class CostEstimateFormComponent {
  @Input() itemToUpdate!: any;
  @Output() showForm = new EventEmitter<boolean>();

  toastService = inject(ToastService);
  costEstimateService = inject(CostEstimateService);
  changeRequestService = inject(ChangeRequestService);
  userService = inject(UserService);

  form = new FormGroup({
    structureType: new FormControl('', Validators.required),
    abutmentType: new FormControl('', Validators.required),
    number_of_Spans: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
    total_Width: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    total_Length: new FormControl(0, [
      Validators.required,
      Validators.min(0.1),
    ]),
    year: new FormControl(0, [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
    ]),
    total_Cost: new FormControl(0),
  });

  // editForm = new FormGroup({
  //   structureType: new FormControl('', Validators.required),
  //   abutmentType: new FormControl('', Validators.required),
  //   number_of_Spans: new FormControl(0, [
  //     Validators.required,
  //     Validators.min(1),
  //   ]),
  //   total_Width: new FormControl(0, [Validators.required, Validators.min(0.1)]),
  //   total_Length: new FormControl(0, [
  //     Validators.required,
  //     Validators.min(0.1),
  //   ]),
  //   year: new FormControl(0, [
  //     Validators.required,
  //     Validators.min(1900),
  //     Validators.max(new Date().getFullYear()),
  //   ]),
  //   total_Cost: new FormControl(0),
  // });

  atributos: any[] = [
    {
      name: 'number_of_Spans',
      label: 'Número de tramos',
    },
    {
      name: 'total_Width',
      label: 'Ancho total (m)',
    },
    {
      name: 'total_Length',
      label: 'Longitud total (m)',
    },
    {
      name: 'year',
      label: 'Año de construcción',
    },
  ];

  structureTypeList: string[] = [
    'adjacent box beams',
    'adjacent slab beams',
    'arch',
    'bulb tee',
    'channel beam',
    'concrete segmental box girder',
    'culvert',
    'deck arches',
    'i-beams',
    'inverset',
    'multi girder curved',
    'multi girder straight',
    'next beam',
    'next beam type d',
    'next beam type f',
    'precast box curlvert',
    'prestressed adjacent box beams',
    'prestressed adjacent slab beams',
    'prestressed bulb tees',
    'prestressed l-beams',
    'prestressed spread box beams',
    'segmental box girder',
    'spread box beams',
    'steel multi girder straight',
    'steel segmental box girder',
    'three sided frame',
    'through girder',
    'through truss',
    'truss',
  ];

  abutmentTypeList: string[] = [
    'abutmentless',
    'cantilever stems',
    'culvert',
    'existing',
    'footing only',
    'integral',
    'integral & gravity',
    'invert slab',
    'semi-integral',
    'short stem',
    'solid cantilever',
    'stem',
    'stub cantilever',
    'stub on msess wall',
    'other',
  ];

  ngOnChanges(): void {
    if (this.itemToUpdate) {
      this.form.patchValue({
        structureType: this.itemToUpdate.input_list.structureType,
        abutmentType: this.itemToUpdate.input_list.abutmentType,
        number_of_Spans: this.itemToUpdate.input_list.number_of_Spans,
        total_Width: this.itemToUpdate.input_list.total_Width,
        total_Length: this.itemToUpdate.input_list.total_Length,
        year: this.itemToUpdate.input_list.year,
        total_Cost: this.itemToUpdate.total_Cost,
      });
    }
  }
  closeForm() {
    this.showForm.emit(false);
    this.form.reset();
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
          if (errors?.['min']) {
            this.showToastError(
              `El campo "${this.getLabel(key)}" debe ser mayor a 0.`
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
    }

    if (this.itemToUpdate) {
      const { total_Cost, ...inputListWithoutCost } = this.form.value;
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      const item: IChangeRequest = {
        _id: '',
        prediction_id: this.itemToUpdate.id,
        request_type: 'Edición',
        user_id: this.userService.userData()._id,
        date: formattedDate,
        original_prediction_object: {
          _id: this.itemToUpdate.id,
          input_list: this.itemToUpdate.input_list,
          total_Cost: this.itemToUpdate.total_Cost,
          user_id: this.userService.userData()._id,
        },
        new_prediction_object: {
          input_list: inputListWithoutCost,
          total_Cost: this.form.value.total_Cost,
          user_id: this.userService.userData()._id,
        },
        status: 'Pendiente',
      };

      this.changeRequestService.createChangeRequest(item).subscribe({
        next: (res) => {
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set(
            'Solicitud de edición de estimación de costo creada correctamente.'
          );
          this.closeForm();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.costEstimateService.createCostEstimation(this.form.value).subscribe(
        (res) => {
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set(
            'Estimación de costo creada correctamente.'
          );
          this.form.patchValue({ total_Cost: (res as any).predicted_cost });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.showToast.set(true);
      this.toastService.toastType.set('toast-error');
      this.toastService.toastMessage.set('El formulario no es valido.');
      return;
    }
    const costEstimation: ICostEstimate = {
      id: '',
      user_id: this.userService.userData()._id,
      input_list: {
        structureType: this.form.value.structureType!,
        abutmentType: this.form.value.abutmentType!,
        number_of_Spans: this.form.value.number_of_Spans!,
        total_Width: this.form.value.total_Width!,
        total_Length: this.form.value.total_Length!,
        year: this.form.value.year!,
      },
      total_Cost: this.form.value.total_Cost!,
    };

    this.costEstimateService.saveCostEstimation(costEstimation).subscribe({
      next: (res) => {
        this.toastService.showToast.set(true);
        this.toastService.toastType.set('toast-success');
        this.toastService.toastMessage.set(
          'Estimación de costo guardada correctamente.'
        );
        this.closeForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showToastError(message: string) {
    this.toastService.showToast.set(true);
    this.toastService.toastType.set('toast-error');
    this.toastService.toastMessage.set(message);
  }

  getLabel(field: string): string {
    const labels: { [key: string]: string } = {
      structureType: 'Tipo de estructura',
      abutmentType: 'Tipo de estribo',
      number_of_Spans: 'Número de tramos',
      total_Width: 'Ancho total',
      total_Length: 'Longitud total',
      year: 'Año',
      total_Cost: 'Costo total',
    };

    return labels[field] || field;
  }
}
