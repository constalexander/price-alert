import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCryptoPrice(symbol: string): Observable<number> {
    return this.http
      .get<any>(`${this.baseUrl}/simple/price`, {
        params: {
          ids: symbol.toLowerCase(),
          vs_currencies: 'usd',
        },
      })
      .pipe(
        map((response) => {
          const price = response[symbol.toLowerCase()]?.usd;
          if (!price) {
            throw new Error(`Price not found for ${symbol}`);
          }
          return price;
        })
      );
  }
}
