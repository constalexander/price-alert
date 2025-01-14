import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LegalService {
  private readonly DISCLAIMER_SHOWN_KEY = 'disclaimer_shown';
  private disclaimerShownSignal = signal<boolean>(this.hasDisclaimerBeenShown());

  hasDisclaimerBeenShown(): boolean {
    return localStorage.getItem(this.DISCLAIMER_SHOWN_KEY) === 'true';
  }

  markDisclaimerAsShown(): void {
    localStorage.setItem(this.DISCLAIMER_SHOWN_KEY, 'true');
    this.disclaimerShownSignal.set(true);
  }

  get disclaimerShown() {
    return this.disclaimerShownSignal.asReadonly();
  }
}
