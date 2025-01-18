import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DisclaimerDialogComponent } from '@/core/legal/disclaimer-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [DisclaimerDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @ViewChild(DisclaimerDialogComponent)
  disclaimerDialog!: DisclaimerDialogComponent;

  showDisclaimer(): void {
    this.disclaimerDialog.show();
  }
}
