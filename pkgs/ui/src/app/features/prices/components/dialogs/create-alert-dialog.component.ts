import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MetalPriceComponent } from '@/features/prices/components/metal/metal-price.component';

@Component({
  selector: 'app-create-alert-dialog',
  templateUrl: './create-alert-dialog.component.html',
  imports: [DialogModule, ButtonModule, MetalPriceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAlertDialogComponent {
  visible = false;
  private cdr = inject(ChangeDetectorRef);

  show() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  hide() {
    this.visible = false;
    this.cdr.detectChanges();
  }
}
