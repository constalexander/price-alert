import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SettingsService } from '@/core/services/settings.service';
import { Currency } from '@/core/models/currency.model';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-6">Preferences</h1>
      <div class="max-w-xl">
        <div class="bg-surface-700 rounded-lg p-6">
          <h2 class="text-xl mb-4">Currency Preferences</h2>
          <div class="flex items-center gap-4">
            <label class="text-surface-200">Default Currency:</label>
            <p-selectButton
              [options]="currencyOptions"
              [ngModel]="selectedCurrency"
              (ngModelChange)="onCurrencyChange($event)"
              optionLabel="value"
              optionValue="value"
            >
              <ng-template let-item>
                <i [class]="item.icon"></i>
              </ng-template>
            </p-selectButton>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent {
  private settingsService = inject(SettingsService);

  currencyOptions = [
    { icon: 'pi pi-dollar', value: 'usd' as Currency },
    { icon: 'pi pi-euro', value: 'eur' as Currency },
  ];

  get selectedCurrency() {
    return this.settingsService.defaultCurrency();
  }

  onCurrencyChange(currency: Currency): void {
    this.settingsService.setDefaultCurrency(currency);
  }
}
