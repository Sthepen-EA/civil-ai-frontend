import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-change-request-table',
  standalone: true,
  imports: [],
  templateUrl: './change-request-table.component.html',
  styleUrl: './change-request-table.component.css',
})
export class ChangeRequestTableComponent {
  @Input() changeRequestList: Signal<any> = signal([]);
  @Output() changeItem = new EventEmitter<any>();

  showCostEstimation(item: any) {
    this.changeItem.emit(item);
  }
}
