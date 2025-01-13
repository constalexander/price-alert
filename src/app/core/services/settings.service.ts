import { Injectable, signal, effect } from '@angular/core';
import { Currency } from '@/core/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly STORAGE_KEY = 'app_settings';
  private readonly defaultCurrencySignal = signal<Currency>(this.loadSetting('defaultCurrency', 'usd'));

  constructor() {
    // Debug effect for settings changes
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
    this.saveSetting('defaultCurrency', currency);
  }

  private loadSetting<T>(key: string, defaultValue: T): T {
    const settings = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return settings[key] ?? defaultValue;
  }

  private saveSetting(key: string, value: unknown): void {
    const settings = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    settings[key] = value;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }
}
