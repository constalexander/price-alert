import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  selectedCurrency = 'usd';

  currencyOptions = [
    { icon: 'pi pi-dollar', value: 'usd' },
    { icon: 'pi pi-euro', value: 'eur' },
  ];

  onCurrencyChange(): void {
    // TODO: Implement currency change persistence
    console.log('Currency changed to:', this.selectedCurrency);
  }
}
