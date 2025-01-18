import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

interface CoinGeckoSearchResult {
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    market_cap_rank: number;
  }>;
}

export interface CryptoSearchResult {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  private http = inject(HttpClient);

  constructor() {}

  getCryptoPrice(coinId: string, currency: string = 'usd'): Observable<number> {
    return this.http
      .get<any>(`${this.baseUrl}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: currency,
        },
      })
      .pipe(
        map((response) => {
          const price = response[coinId]?.[currency];
          if (!price) {
            throw new Error(`Price not found for ${coinId}`);
          }
          return price;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(() => new Error(`Cryptocurrency ${coinId} not found`));
          }
          return throwError(() => error);
        })
      );
  }

  searchCryptos(query: string): Observable<CryptoSearchResult[]> {
    return this.http
      .get<CoinGeckoSearchResult>(`${this.baseUrl}/search`, {
        params: { query: query.trim() },
      })
      .pipe(
        map((result) => result.coins),
        catchError((error) => {
          console.error('Error searching cryptocurrencies:', error);
          return throwError(() => new Error('Failed to search cryptocurrencies'));
        })
      );
  }
}
