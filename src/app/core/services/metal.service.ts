import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@/env/environment';

export interface MetalPriceResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: {
    XAU: number;
    USDXAU: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MetalService {
  private readonly API_URL = 'https://api.metalpriceapi.com/v1';
  private readonly API_KEY = environment.METAL_PRICE_API_KEY;
  private http = inject(HttpClient);

  constructor() {}

  getGoldPrice(currency: string = 'USD'): Observable<number> {
    return this.http
      .get<MetalPriceResponse>(`${this.API_URL}/latest`, {
        params: {
          api_key: this.API_KEY,
          base: currency,
          currencies: 'XAU',
        },
      })
      .pipe(map((response) => response.rates.USDXAU));
  }

  getHistoricalGoldPrice(date: string, currency: string = 'USD'): Observable<number> {
    return this.http
      .get<MetalPriceResponse>(`${this.API_URL}/${date}`, {
        params: {
          api_key: this.API_KEY,
          base: currency,
          currencies: 'XAU',
        },
      })
      .pipe(map((response) => response.rates.USDXAU));
  }
}
