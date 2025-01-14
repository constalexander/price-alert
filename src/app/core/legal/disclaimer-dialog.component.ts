import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LegalService } from '@/core/services/legal.service';

@Component({
  selector: 'app-disclaimer-dialog',
  templateUrl: './disclaimer-dialog.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerDialogComponent {
  visible = false;

  constructor(private legalService: LegalService) {}

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
    this.legalService.markDisclaimerAsShown();
  }
}
