import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SettingsService } from '@/core/services/settings.service';
import { Currency } from '@/core/models/currency.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [CommonModule, FormsModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  currencyOptions = [
    { icon: 'pi pi-dollar', value: 'usd' as Currency },
    { icon: 'pi pi-euro', value: 'eur' as Currency },
  ];

  constructor(private settingsService: SettingsService) {}

  get selectedCurrency() {
    return this.settingsService.defaultCurrency();
  }

  onCurrencyChange(currency: Currency): void {
    this.settingsService.setDefaultCurrency(currency);
  }
}
