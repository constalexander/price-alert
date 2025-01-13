import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, switchMap } from 'rxjs';

interface CoinGeckoSearchResult {
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    market_cap_rank: number;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCryptoPrice(input: string, currency: string = 'usd'): Observable<number> {
    const query = input.trim();

    return this.http
      .get<CoinGeckoSearchResult>(`${this.baseUrl}/search`, {
        params: { query },
      })
      .pipe(
        map((result) => {
          const coin = result.coins[0];
          if (!coin) {
            throw new Error(`Cryptocurrency ${input} not found`);
          }
          return coin.id;
        }),
        switchMap((coinId) =>
          this.http.get<any>(`${this.baseUrl}/simple/price`, {
            params: {
              ids: coinId,
              vs_currencies: currency,
            },
          })
        ),
        map((response) => {
          const [coinId] = Object.keys(response);
          const price = response[coinId]?.[currency];
          if (!price) {
            throw new Error(`Price not found for ${input}`);
          }
          return price;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError(() => new Error(`Cryptocurrency ${input} not found`));
          }
          return throwError(() => error);
        })
      );
  }
}
