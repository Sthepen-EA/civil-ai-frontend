import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CostEstimateService } from '../../services/cost-estimate.service';
import { ICostEstimate, IInputListItem } from '../../interfaces/CostEstimate';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ChangeRequestService } from '../../services/change-request.service';
import { IChangeRequest } from '../../interfaces/ChangeRequest';

@Component({
  selector: 'app-cost-estimate-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cost-estimate-form.component.html',
  styleUrl: './cost-estimate-form.component.css',
})
export class CostEstimateFormComponent {
  @Input() itemToUpdate!: ICostEstimate;
  @Output() showForm = new EventEmitter<boolean>();

  toastService = inject(ToastService);
  costEstimateService = inject(CostEstimateService);
  changeRequestService = inject(ChangeRequestService);
  userService = inject(UserService);

  form = new FormGroup({
    structureType: new FormControl(''),
    abutmentType: new FormControl(''),
    number_of_Spans: new FormControl(0),
    total_Width: new FormControl(0),
    total_Length: new FormControl(0),
    year: new FormControl(0),
  });

  editForm = new FormGroup({
    structureType: new FormControl(''),
    abutmentType: new FormControl(''),
    number_of_Spans: new FormControl(0),
    total_Width: new FormControl(0),
    total_Length: new FormControl(0),
    year: new FormControl(0),
    total_Cost: new FormControl(0),
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

  // structureTypeList: string[] = [
  //   'Vigas cajón adyacentes',
  //   'Vigas losa adyacentes',
  //   'Arco',
  //   'Viga tipo bulb tee',
  //   'Viga tipo canal',
  //   'Viga cajón segmentada de concreto',
  //   'Alcantarilla',
  //   'Arcos de tablero',
  //   'Vigas en I',
  //   'Inverset',
  //   'Vigas múltiples curvas',
  //   'Vigas múltiples rectas',
  //   'Viga Next',
  //   'Viga Next tipo D',
  //   'Viga Next tipo F',
  //   'Alcantarilla de cajón prefabricada',
  //   'Vigas cajón adyacentes pretensadas',
  //   'Vigas losa adyacentes pretensadas',
  //   'Vigas tipo bulb tee pretensadas',
  //   'Vigas en L pretensadas',
  //   'Vigas cajón separadas pretensadas',
  //   'Viga cajón segmentada',
  //   'Vigas cajón separadas',
  //   'Vigas múltiples rectas de acero',
  //   'Viga cajón segmentada de acero',
  //   'Marco de tres lados',
  //   'Viga pasante',
  //   'Celosía pasante',
  //   'Celosía',
  // ];

  // abutmentTypeList: string[] = [
  //   'Sin estribo',
  //   'Tallos en voladizo',
  //   'Alcantarilla',
  //   'Existente',
  //   'Solo cimentación',
  //   'Integral',
  //   'Integral y gravedad',
  //   'Losa invertida',
  //   'Semi-integral',
  //   'Tallo corto',
  //   'Voladizo sólido',
  //   'Tallo',
  //   'Voladizo corto',
  //   'Voladizo corto sobre muro MS',
  //   'Otro',
  // ];

  ngOnChanges(): void {
    this.editForm.patchValue({
      structureType: this.itemToUpdate.input_list.structureType,
      abutmentType: this.itemToUpdate.input_list.abutmentType,
      number_of_Spans: this.itemToUpdate.input_list.number_of_Spans,
      total_Width: this.itemToUpdate.input_list.total_Width,
      total_Length: this.itemToUpdate.input_list.total_Length,
      year: this.itemToUpdate.input_list.year,
      total_Cost: this.itemToUpdate.total_Cost,
    });
  }
  closeForm() {
    this.showForm.emit(false);
  }
  sendForm() {
    if (this.form.invalid) {
      console.log('error');
      this.toastService.showToast.set(true);
      this.toastService.toastType.set('toast-error');
      this.toastService.toastMessage.set(
        'Por favor, complete todos los campos.'
      );
    } else if (this.itemToUpdate) {
      const { total_Cost, ...inputListWithoutCost } = this.editForm.value;
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      const item: IChangeRequest = {
        _id: '',
        prediction_id: this.itemToUpdate.id,
        request_type: 'Edición',
        user_id: this.userService.userData()._id,
        date: formattedDate,
        original_prediction_object: this.itemToUpdate,
        new_prediction_object: {
          input_list: inputListWithoutCost,
          total_Cost: this.editForm.value.total_Cost,
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
          this.form.reset();
          this.toastService.showToast.set(true);
          this.toastService.toastType.set('toast-success');
          this.toastService.toastMessage.set(
            'Estimación de costo creada correctamente.'
          );
          this.closeForm();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
