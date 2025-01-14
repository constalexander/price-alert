import { ChangeDetectionStrategy, Component, signal, PLATFORM_ID, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LegalService } from '@/core/services/legal.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-disclaimer-dialog',
  templateUrl: './disclaimer-dialog.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerDialogComponent {
  visible = signal(false);
  protected readonly platformId = inject(PLATFORM_ID);
  protected readonly isPlatformBrowser = isPlatformBrowser;

  constructor(private legalService: LegalService) {}

  show(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visible.set(true);
    }
  }

  hide(): void {
    console.log('DisclaimerDialog: hide() called');
    if (isPlatformBrowser(this.platformId)) {
      this.visible.set(false);
      this.legalService.markDisclaimerAsShown();
    }
  }
}
