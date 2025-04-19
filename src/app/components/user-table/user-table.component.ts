import { Component, Input, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  @Input() userList: Signal<any> = signal([]);
}
