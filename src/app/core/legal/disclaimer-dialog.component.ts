import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LegalService } from '@/core/services/legal.service';

@Component({
  selector: 'app-disclaimer-dialog',
  templateUrl: './disclaimer-dialog.component.html',
  imports: [DialogModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerDialogComponent {
  visible = signal(false);

  constructor(private legalService: LegalService) {}

  show(): void {
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
    this.legalService.markDisclaimerAsShown();
  }
}
