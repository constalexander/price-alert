import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateAlertDialogComponent } from '@/features/prices/components/dialogs/create-alert-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CreateAlertDialogComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @ViewChild(CreateAlertDialogComponent, { static: true }) createAlertDialog?: CreateAlertDialogComponent;

  showCreateAlert() {
    this.createAlertDialog?.show();
  }
}
