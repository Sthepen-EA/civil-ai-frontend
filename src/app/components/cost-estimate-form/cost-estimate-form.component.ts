import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CostEstimateService } from '../../services/cost-estimate.service';
import { IInputListItem } from '../../interfaces/CostEstimate';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cost-estimate-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cost-estimate-form.component.html',
  styleUrl: './cost-estimate-form.component.css',
})
export class CostEstimateFormComponent {
  @Output() showForm = new EventEmitter<boolean>();

  toastService = inject(ToastService);
  costEstimateService = inject(CostEstimateService);

  form = new FormGroup({
    structureType: new FormControl(''),
    abutmentType: new FormControl(''),
    number_of_Spans: new FormControl(0),
    total_Width: new FormControl(0),
    total_Length: new FormControl(0),
    year: new FormControl(0),
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
    'Adjacent box beams',
    'Adjacent slab beams',
    'Arch',
    'Bulb tee',
    'Channel beam',
    'Concrete segmental box girder',
    'Culvert',
    'Deck arches',
    'I-beams',
    'Inverset',
    'Multi girder curved',
    'Multi girder straight',
    'Next beam',
    'Next beam type d',
    'Next beam type f',
    'Precast box curlvert',
    'Prestressed adjacent box beams',
    'Prestressed adjacent slab beams',
    'Prestressed bulb tees',
    'Prestressed l-beams',
    'Prestressed spread box beams',
    'Segmental box girder',
    'Spread box beams',
    'Steel multi girder straight',
    'Steel segmental box girder',
    'Three sided frame',
    'Through girder',
    'Through truss',
    'Truss',
  ];

  abutmentTypeList: string[] = [
    'Abutmentless',
    'Cantilever stems',
    'Culvert',
    'Existing',
    'Footing only',
    'Integral',
    'Integral & gravity',
    'Invert slab',
    'Semi-integral',
    'Short stem',
    'Solid cantilever',
    'Stem',
    'Stub cantilever',
    'Stub on msess wall',
    'Other',
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
