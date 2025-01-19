import { Component } from '@angular/core';
import { CryptoPriceComponent } from '@/features/prices/components/crypto/crypto-price.component';
import { MetalPriceComponent } from '@/features/prices/components/metal/metal-price.component';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  standalone: true,
  imports: [CryptoPriceComponent, MetalPriceComponent],
})
export class SandboxComponent {
  showRegisterDialog = false;
  showLoginDialog = false;
}
