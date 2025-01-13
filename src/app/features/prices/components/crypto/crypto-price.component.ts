import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CryptoService } from '@/core/services/crypto.service';

@Component({
  selector: 'app-crypto-price',
  templateUrl: './crypto-price.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoPriceComponent {
  symbol = '';
  price: number | null = null;
  loading = false;
  error = '';
  selectedCurrency = 'usd';

  constructor(
    private cryptoService: CryptoService,
    private cdr: ChangeDetectorRef
  ) {}

  getPrice(): void {
    if (!this.symbol) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.cryptoService.getCryptoPrice(this.symbol, this.selectedCurrency).subscribe({
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
