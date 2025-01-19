import { Component, ViewChild, OnInit, AfterViewInit, inject, Inject, PLATFORM_ID } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(DisclaimerDialogComponent) disclaimerDialog!: DisclaimerDialogComponent;
  private legalService = inject(LegalService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    console.log('platform is ', this.platformId);
  }

  ngAfterViewInit() {
    if (!this.legalService.disclaimerShown()) {
      setTimeout(() => {
        this.disclaimerDialog.show();
      }, 0);
    }
  }
}
