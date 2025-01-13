import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-alert-dialog',
  templateUrl: './create-alert-dialog.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAlertDialogComponent {
  visible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  show() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  hide() {
    this.visible = false;
    this.cdr.detectChanges();
  }
}
