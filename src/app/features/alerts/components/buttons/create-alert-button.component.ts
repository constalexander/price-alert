import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { CreateAlertDialogComponent } from '@/features/prices/components/dialogs/create-alert-dialog.component';

@Component({
  selector: 'app-create-alert-button',
  imports: [ButtonModule, PopoverModule, CreateAlertDialogComponent],
  templateUrl: './create-alert-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAlertButtonComponent {
  @ViewChild(CreateAlertDialogComponent, { static: true }) createAlertDialog?: CreateAlertDialogComponent;

  selectAssetType(type: string) {
    if (type === 'crypto') {
      this.createAlertDialog?.show();
    }
  }
}
