import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MetalService } from '@/core/services/metal.service';
import { SettingsService } from '@/core/services/settings.service';
import { NotificationService } from '@/core/services/notification.service';
import { inject } from '@angular/core';

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

  get selectedMetalName(): string {
    return this.metalOptions.find((m) => m.value === this.selectedMetal)?.label || '';
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

    this.metalService.getMetalPrice(this.selectedMetal!, this.selectedCurrency).subscribe({
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

  async createAlert(): Promise<void> {
    if (!this.selectedMetal || this.price === null) return;

    console.log('Creating alert...'); // Debug log
    const message = `Alert created for ${this.selectedMetalName} at ${this.selectedCurrency === 'usd' ? '$' : '€'}${this.price.toLocaleString()}`;
    await this.notificationService.showNotification(message);
  }
}
