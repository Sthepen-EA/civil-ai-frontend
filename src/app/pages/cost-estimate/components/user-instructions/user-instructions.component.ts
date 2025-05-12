import { Component } from '@angular/core';
import { WarningIconComponent } from '../../../../icons/warning-icon/warning-icon.component';

@Component({
  selector: 'app-user-instructions',
  standalone: true,
  imports: [WarningIconComponent],
  templateUrl: './user-instructions.component.html',
  styleUrl: './user-instructions.component.css',
})
export class UserInstructionsComponent {}
