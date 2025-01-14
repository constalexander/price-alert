import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LegalService {
  private disclaimerShownSignal = signal<boolean>(false);

  markDisclaimerAsShown(): void {
    this.disclaimerShownSignal.set(true);
  }

  get disclaimerShown() {
    return this.disclaimerShownSignal.asReadonly();
  }
}
