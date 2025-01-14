import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MetalService } from '@/core/services/metal.service';
import { SettingsService } from '@/core/services/settings.service';

@Component({
  selector: 'app-metal-price',
  templateUrl: './metal-price.component.html',
  imports: [CommonModule, FormsModule, ButtonModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetalPriceComponent {
  metalOptions = [
    { label: 'Gold', value: 'XAU' },
    { label: 'Silver', value: 'XAG' },
    { label: 'Platinum', value: 'XPT' },
  ];

  selectedMetal: string | null = null;
  price: number | null = null;
  loading = false;
  error = '';

  constructor(
    private metalService: MetalService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) {}

  get selectedCurrency() {
    return this.settingsService.defaultCurrency();
  }

  get canGetPrice(): boolean {
    return this.selectedMetal !== null;
  }

  onSelect(): void {
    this.error = '';
    this.price = null;
    this.cdr.markForCheck();
  }

  getPrice(): void {
    if (!this.canGetPrice) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.metalService.getGoldPrice(this.selectedCurrency).subscribe({
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
