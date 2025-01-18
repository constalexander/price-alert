import { Injectable, signal, effect } from '@angular/core';
import { Currency } from '@/core/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly defaultCurrencySignal = signal<Currency>('usd');

  constructor() {
    effect(() => {
      const currency = this.defaultCurrencySignal();
      console.log('Settings changed - Default Currency:', currency);
    });
  }

  get defaultCurrency() {
    return this.defaultCurrencySignal;
  }

  setDefaultCurrency(currency: Currency): void {
    this.defaultCurrencySignal.set(currency);
  }
}
