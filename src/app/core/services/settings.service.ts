import { Injectable, signal } from '@angular/core';
import { Currency } from '@/core/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly defaultCurrencySignal = signal<Currency>('usd');

  get defaultCurrency() {
    return this.defaultCurrencySignal;
  }

  setDefaultCurrency(currency: Currency): void {
    this.defaultCurrencySignal.set(currency);
    // TODO: Persist to localStorage or backend
  }
}
