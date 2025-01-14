import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CryptoPriceComponent } from '@/features/prices/components/crypto/crypto-price.component';
import { MetalPriceComponent } from '@/features/prices/components/metal/metal-price.component';

@Component({
  selector: 'app-sandbox',
  imports: [CommonModule, CryptoPriceComponent, MetalPriceComponent],
  templateUrl: './sandbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
  // This component will be a container for various sandbox components
}
