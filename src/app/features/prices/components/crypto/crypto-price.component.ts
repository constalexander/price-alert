import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CryptoService, CryptoSearchResult } from '@/core/services/crypto.service';
import { SettingsService } from '@/core/services/settings.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-crypto-price',
  templateUrl: './crypto-price.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoPriceComponent {
  selectedCrypto: CryptoSearchResult | null = null;
  suggestions: CryptoSearchResult[] = [];
  price: number | null = null;
  loading = false;
  error = '';
  private searchSubject = new Subject<string>();

  constructor(
    private cryptoService: CryptoService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) {
    this.setupSearch();
  }

  get selectedCurrency() {
    return this.settingsService.defaultCurrency();
  }

  get canGetPrice(): boolean {
    return this.selectedCrypto !== null && typeof this.selectedCrypto === 'object' && 'id' in this.selectedCrypto;
  }

  private setupSearch(): void {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      if (query) {
        this.searchCryptos(query);
      } else {
        this.suggestions = [];
        this.cdr.markForCheck();
      }
    });
  }

  onSearch(event: { query: string }): void {
    this.searchSubject.next(event.query);
  }

  onSelect(): void {
    this.error = '';
    this.price = null;
    this.cdr.markForCheck();
  }

  private searchCryptos(query: string): void {
    this.cryptoService.searchCryptos(query).subscribe({
      next: (results) => {
        this.suggestions = results;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.message;
        this.suggestions = [];
        this.cdr.markForCheck();
      },
    });
  }

  getPrice(): void {
    if (!this.canGetPrice) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.cryptoService.getCryptoPrice(this.selectedCrypto!.id, this.selectedCurrency).subscribe({
      next: (price) => {
        this.price = price;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.message;
        this.price = null;
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
