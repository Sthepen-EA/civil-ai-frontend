import { CurrencyPipe } from '@angular/common';
import { Component, Input, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-cost-estimate-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cost-estimate-table.component.html',
  styleUrl: './cost-estimate-table.component.css',
})
export class CostEstimateTableComponent {
  @Input() costEstimationList: Signal<any> = signal([]);
}
