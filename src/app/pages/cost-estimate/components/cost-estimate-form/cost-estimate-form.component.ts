import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CurrencyPipe, NgClass } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';
import { IChangeRequest } from '../../../../interfaces/ChangeRequest';
import { ICostEstimate } from '../../../../interfaces/CostEstimate';
import { CostEstimateService } from '../../services/cost-estimate.service';
import { ChangeRequestService } from '../../../change-request/services/change-request.service';
import { UserService } from '../../../user/services/user.service';
import { CloseIconComponent } from '../../../../icons/close-icon/close-icon.component';

@Component({
  selector: 'app-cost-estimate-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, NgClass, CloseIconComponent],
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

  isCalculating = false;

  form = new FormGroup({
    structureType: new FormControl('', Validators.required),
    abutmentType: new FormControl('', Validators.required),
    number_of_Spans: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(3000),
    ]),
    total_Width: new FormControl(0, [
      Validators.required,
      Validators.min(2),
      Validators.max(100),
    ]),
    total_Length: new FormControl(0, [
      Validators.required,
      Validators.min(6),
      Validators.max(200000),
    ]),
    year: new FormControl(0, [
      Validators.required,
      Validators.min(new Date().getFullYear()),
      Validators.max(2050),
    ]),
    total_Cost: new FormControl(0),
    project_id: new FormControl('', Validators.required),
    abutmentTypeES: new FormControl('', Validators.required),
    structureTypeES: new FormControl('', Validators.required),
    hasRequest: new FormControl(false, Validators.required),
  });

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

  structureTypeList: { en: string; es: string }[] = [
    { en: 'adjacent box beams', es: 'vigas cajón adyacentes' },
    { en: 'adjacent slab beams', es: 'vigas losa adyacentes' },
    { en: 'arch', es: 'arco' },
    { en: 'bulb tee', es: 'viga tipo bulb tee' },
    { en: 'channel beam', es: 'viga canal' },
    {
      en: 'concrete segmental box girder',
      es: 'viga cajón segmentada de concreto',
    },
    { en: 'culvert', es: 'alcantarilla' },
    { en: 'deck arches', es: 'arcos de tablero' },
    { en: 'i-beams', es: 'vigas tipo I' },
    { en: 'inverset', es: 'viga inverset' },
    { en: 'multi girder curved', es: 'vigas múltiples curvas' },
    { en: 'multi girder straight', es: 'vigas múltiples rectas' },
    { en: 'next beam', es: 'viga NEXT' },
    { en: 'next beam type d', es: 'viga NEXT tipo D' },
    { en: 'next beam type f', es: 'viga NEXT tipo F' },
    { en: 'precast box curlvert', es: 'alcantarilla cajón prefabricada' },
    {
      en: 'prestressed adjacent box beams',
      es: 'vigas cajón adyacentes pretensadas',
    },
    {
      en: 'prestressed adjacent slab beams',
      es: 'vigas losa adyacentes pretensadas',
    },
    { en: 'prestressed bulb tees', es: 'bulb tees pretensadas' },
    { en: 'prestressed l-beams', es: 'vigas tipo L pretensadas' },
    {
      en: 'prestressed spread box beams',
      es: 'vigas cajón separadas pretensadas',
    },
    { en: 'segmental box girder', es: 'viga cajón segmentada' },
    { en: 'spread box beams', es: 'vigas cajón separadas' },
    {
      en: 'steel multi girder straight',
      es: 'vigas múltiples rectas de acero',
    },
    { en: 'steel segmental box girder', es: 'viga cajón segmentada de acero' },
    { en: 'three sided frame', es: 'estructura de tres lados' },
    { en: 'through girder', es: 'viga pasante' },
    { en: 'through truss', es: 'cercha pasante' },
    { en: 'truss', es: 'cercha' },
  ];

  abutmentTypeList: { en: string; es: string }[] = [
    { en: 'abutmentless', es: 'sin estribo' },
    { en: 'cantilever stems', es: 'vástagos en voladizo' },
    { en: 'culvert', es: 'alcantarilla' },
    { en: 'existing', es: 'existente' },
    { en: 'footing only', es: 'solo cimentación' },
    { en: 'integral', es: 'integral' },
    { en: 'integral & gravity', es: 'integral y por gravedad' },
    { en: 'invert slab', es: 'losa inferior' },
    { en: 'semi-integral', es: 'semi-integral' },
    { en: 'short stem', es: 'vástago corto' },
    { en: 'solid cantilever', es: 'voladizo sólido' },
    { en: 'stem', es: 'vástago' },
    { en: 'stub cantilever', es: 'voladizo tipo stub' },
    { en: 'stub on msess wall', es: 'voladizo tipo stub sobre muro msess' },
    { en: 'other', es: 'otro' },
  ];

  ngOnInit() {
    this.form.get('structureType')?.valueChanges.subscribe((selectedEn) => {
      const selectedItem = this.structureTypeList.find(
        (item) => item.en === selectedEn
      );
      if (selectedItem) {
        this.form
          .get('structureTypeES')
          ?.setValue(selectedItem.es, { emitEvent: false });
      } else {
        this.form.get('structureTypeES')?.setValue('', { emitEvent: false });
      }
    });

    this.form.get('abutmentType')?.valueChanges.subscribe((selectedEn) => {
      const selectedItem = this.abutmentTypeList.find(
        (item) => item.en === selectedEn
      );
      if (selectedItem) {
        this.form
          .get('abutmentTypeES')
          ?.setValue(selectedItem.es, { emitEvent: false });
      } else {
        this.form.get('abutmentTypeES')?.setValue('', { emitEvent: false });
      }
    });
  }

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
        project_id: this.itemToUpdate.project_id,
        abutmentTypeES: this.itemToUpdate.abutmentTypeES,
        structureTypeES: this.itemToUpdate.structureTypeES,
        hasRequest: this.itemToUpdate.hasRequest,
      });
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
          if (errors?.['min'] || errors?.['max']) {
            switch (key) {
              case 'total_Width':
                this.showToastError(
                  'El ancho total debe estar entre 2 y 100 metros.'
                );
                break;
              case 'number_of_Spans':
                this.showToastError(
                  'El número de tramos debe estar entre 1 y 3 000.'
                );
                break;
              case 'total_Length':
                this.showToastError(
                  'La longitud total debe estar entre 6 y 200 000 metros.'
                );
                break;
              case 'year':
                this.showToastError(
                  `El año debe estar entre ${new Date().getFullYear()} y 2050.`
                );
                break;
              default:
                this.showToastError(
                  `El campo "${this.getLabel(
                    key
                  )}" tiene un valor fuera del rango permitido.`
                );
            }
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
    this.isCalculating = true;

    // seteamos 2 segundos para mostar el cargando...
    setTimeout(() => {
      if (this.itemToUpdate) {
        const { total_Cost, ...inputListWithoutCost } = this.form.value;
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const item: IChangeRequest = {
          _id: '',
          prediction_id: this.itemToUpdate.id,
          request_type: 'Edición',
          user_id: this.userService.userData()._id,
          user_name: this.userService.userData().name,
          date: formattedDate,
          original_prediction_object: {
            _id: this.itemToUpdate.id,
            input_list: this.itemToUpdate.input_list,
            total_Cost: this.itemToUpdate.total_Cost,
            user_id: this.userService.userData()._id,
            project_id: this.itemToUpdate.project_id,
            abutmentTypeES: this.form.value.abutmentTypeES,
            structureTypeES: this.form.value.structureTypeES,
            hasRequest: true,
          },
          new_prediction_object: {
            input_list: inputListWithoutCost,
            total_Cost: this.form.value.total_Cost,
            user_id: this.userService.userData()._id,
            project_id: this.itemToUpdate.project_id,
            abutmentTypeES: this.form.value.abutmentTypeES,
            structureTypeES: this.form.value.structureTypeES,
            hasRequest: true,
          },
          status: 'Pendiente',
          project_id: this.itemToUpdate.project_id,
        };

        this.changeRequestService.createChangeRequest(item).subscribe({
          next: (res) => {
            this.toastService.showToast.set(true);
            this.toastService.toastType.set('toast-success');
            this.toastService.toastMessage.set(
              'Solicitud de edición de estimación de costo creada correctamente.'
            );
            this.isCalculating = false;
            this.showForm.emit(false);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.costEstimateService
          .createCostEstimation(this.form.value)
          .subscribe(
            (res) => {
              this.toastService.showToast.set(true);
              this.toastService.toastType.set('toast-success');
              this.toastService.toastMessage.set(
                'Estimación de costo creada correctamente.'
              );
              this.form.patchValue({ total_Cost: (res as any).predicted_cost });
              this.saveForm();
              this.isCalculating = false;
            },
            (err) => {
              console.log(err);
            }
          );
      }
    }, 1000);
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
      project_id: this.form.value.project_id!,
      abutmentTypeES: this.form.value.abutmentTypeES!,
      structureTypeES: this.form.value.structureTypeES!,
      hasRequest: this.form.value.hasRequest!,
    };

    this.costEstimateService.saveCostEstimation(costEstimation).subscribe({
      next: (res) => {
        this.toastService.showToast.set(true);
        this.toastService.toastType.set('toast-success');
        this.toastService.toastMessage.set(
          'Estimación de costo guardada correctamente.'
        );
        this.costEstimateService.getAndSetCostEstimationList();
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
