import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateAlertButtonComponent } from '@/features/alerts/components/buttons/create-alert-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CreateAlertButtonComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
