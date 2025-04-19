import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, signal, Signal } from '@angular/core';
import { IChangeRequest } from '../../interfaces/ChangeRequest';
import { ChangeRequestService } from '../../services/change-request.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cost-estimate-table',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cost-estimate-table.component.html',
  styleUrl: './cost-estimate-table.component.css',
})
export class CostEstimateTableComponent {
  @Input() costEstimationList: Signal<any> = signal([]);

  changeRequestService = inject(ChangeRequestService);

  editItem(item: IChangeRequest) {
    this.changeRequestService.createChangeRequest(item);
  }

  deleteItem(item: IChangeRequest) {
    this.changeRequestService.createChangeRequest(item);
  }
}
