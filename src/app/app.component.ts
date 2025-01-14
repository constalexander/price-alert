import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@/core/layout/sidebar/sidebar.component';
import { FooterComponent } from '@/core/layout/footer/footer.component';
import { DisclaimerDialogComponent } from '@/core/legal/disclaimer-dialog.component';
import { LegalService } from '@/core/services/legal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FooterComponent, DisclaimerDialogComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DisclaimerDialogComponent) disclaimerDialog!: DisclaimerDialogComponent;

  constructor(private legalService: LegalService) {}

  ngAfterViewInit() {
    if (!this.legalService.disclaimerShown()) {
      setTimeout(() => {
        console.log('Showing disclaimer dialog');
        this.disclaimerDialog.show();
      }, 0);
    }
  }
}
