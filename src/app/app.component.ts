import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@/core/layout/sidebar/sidebar.component';
import { FooterComponent } from '@/core/layout/footer/footer.component';
import { DisclaimerDialogComponent } from '@/core/legal/disclaimer-dialog.component';
import { LegalService } from '@/core/services/legal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, FooterComponent, DisclaimerDialogComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DisclaimerDialogComponent) disclaimerDialog!: DisclaimerDialogComponent;
  private legalService = inject(LegalService);

  constructor() {}

  ngAfterViewInit() {
    if (!this.legalService.disclaimerShown()) {
      setTimeout(() => {
        this.disclaimerDialog.show();
      }, 0);
    }
  }
}
