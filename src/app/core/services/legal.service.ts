import { Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LegalService {
  private readonly DISCLAIMER_KEY = 'disclaimer_shown';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private disclaimerShownSignal = signal<boolean>(
    this.isBrowser ? localStorage.getItem(this.DISCLAIMER_KEY) === 'true' : false
  );

  markDisclaimerAsShown(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.DISCLAIMER_KEY, 'true');
    }
    this.disclaimerShownSignal.set(true);
  }

  get disclaimerShown() {
    return this.disclaimerShownSignal.asReadonly();
  }
}
