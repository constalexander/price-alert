import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CryptoPriceComponent } from '@/features/prices/components/crypto/crypto-price.component';
import { MetalPriceComponent } from '@/features/prices/components/metal/metal-price.component';
import { RegisterComponent } from '@/features/auth/components/register/register.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sandbox',
  imports: [CommonModule, CryptoPriceComponent, MetalPriceComponent, RegisterComponent, ButtonModule],
  templateUrl: './sandbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
  showRegisterDialog = false;
}
