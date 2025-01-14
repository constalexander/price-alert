import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MetalService } from './metal.service';
import { environment } from '@env/environment';

describe('MetalService', () => {
  let service: MetalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MetalService],
    });

    service = TestBed.inject(MetalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch current gold price', (done) => {
    const mockResponse = {
      success: true,
      base: 'USD',
      timestamp: 1234567890,
      rates: {
        XAU: 0.0005,
        USDXAU: 2000,
      },
    };

    service.getGoldPrice().subscribe((price) => {
      expect(price).toBe(2000);
      done();
    });

    const req = httpMock.expectOne(
      `https://api.metalpriceapi.com/v1/latest?api_key=${environment.METAL_PRICE_API_KEY}&base=USD&currencies=XAU`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch historical gold price', (done) => {
    const mockResponse = {
      success: true,
      base: 'USD',
      timestamp: 1234567890,
      rates: {
        XAU: 0.0005,
        USDXAU: 1800,
      },
    };

    const testDate = '2024-01-15';

    service.getHistoricalGoldPrice(testDate).subscribe((price) => {
      expect(price).toBe(1800);
      done();
    });

    const req = httpMock.expectOne(
      `https://api.metalpriceapi.com/v1/${testDate}?api_key=${environment.METAL_PRICE_API_KEY}&base=USD&currencies=XAU`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
