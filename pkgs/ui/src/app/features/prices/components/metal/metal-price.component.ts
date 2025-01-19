import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { MetalService } from '@/core/services/metal.service';
import { SettingsService } from '@/core/services/settings.service';
import { NotificationService } from '@/core/services/notification.service';
import { inject } from '@angular/core';
import { Decimal } from 'decimal.js';

@Component({
  selector: 'app-metal-price',
  templateUrl: './metal-price.component.html',
  imports: [CommonModule, FormsModule, ButtonModule, SelectButtonModule, InputNumberModule],
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
  alertPrice: number | null = null;
  loading = false;
  error = '';
  saving = false;

  private metalService = inject(MetalService);
  private settingsService = inject(SettingsService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  get selectedCurrency() {
    return this.settingsService.defaultCurrency();
  }

  get canGetPrice(): boolean {
    return this.selectedMetal !== null;
  }

  get canSaveAlert(): boolean {
    if (!this.selectedMetal || !this.alertPrice) return false;
    try {
      const decimal = new Decimal(this.alertPrice);
      return decimal.isPositive() && decimal.isFinite();
    } catch {
      return false;
    }
  }

  get selectedMetalName(): string {
    return this.metalOptions.find((m) => m.value === this.selectedMetal)?.label || '';
  }

  onSelect(): void {
    this.error = '';
    this.price = null;
    this.alertPrice = null;
    this.cdr.markForCheck();
  }

  getPrice(): void {
    if (!this.canGetPrice) return;

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.metalService.getMetalPrice(this.selectedMetal!, this.selectedCurrency).subscribe({
      next: (price) => {
        this.price = price;
        this.alertPrice = price;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.message;
        this.price = null;
        this.alertPrice = null;
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  async createAlert(): Promise<void> {
    if (!this.selectedMetal || !this.alertPrice || !this.canSaveAlert) return;

    this.saving = true;
    this.cdr.markForCheck();

    try {
      // Mock save operation - replace with actual API call later
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const message = `Alert created for ${this.selectedMetalName} at ${this.selectedCurrency === 'usd' ? '$' : '€'}${this.alertPrice.toLocaleString()}`;
      await this.notificationService.showNotification(message);
    } finally {
      this.saving = false;
      this.cdr.markForCheck();
    }
  }
}
