import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CryptoService],
    });

    service = TestBed.inject(CryptoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch crypto price successfully', (done) => {
    const mockSymbol = 'bitcoin';
    const mockResponse = { bitcoin: { usd: 50000 } };

    service.getCryptoPrice(mockSymbol).subscribe({
      next: (price) => {
        expect(price).toBe(50000);
        done();
      },
    });

    const req = httpMock.expectOne(`https://api.coingecko.com/api/v3/simple/price?ids=${mockSymbol}&vs_currencies=usd`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should throw error when price is not found', (done) => {
    const mockSymbol = 'invalid-coin';
    const mockResponse = { 'invalid-coin': {} };

    service.getCryptoPrice(mockSymbol).subscribe({
      error: (error) => {
        expect(error.message).toBe('Price not found for invalid-coin');
        done();
      },
    });

    const req = httpMock.expectOne(`https://api.coingecko.com/api/v3/simple/price?ids=${mockSymbol}&vs_currencies=usd`);
    req.flush(mockResponse);
  });
});
