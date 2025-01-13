import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';
import { Currency } from '@/core/models/currency.model';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService],
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('defaultCurrency', () => {
    it('should initialize with USD', () => {
      expect(service.defaultCurrency()).toBe('usd');
    });

    it('should update currency when setDefaultCurrency is called', () => {
      service.setDefaultCurrency('eur');
      expect(service.defaultCurrency()).toBe('eur');
    });

    it('should maintain the updated currency value', () => {
      service.setDefaultCurrency('eur');
      service.setDefaultCurrency('usd');
      expect(service.defaultCurrency()).toBe('usd');
    });

    it('should handle multiple currency changes', () => {
      const currencies: Currency[] = ['usd', 'eur', 'usd', 'eur'];
      currencies.forEach((currency) => {
        service.setDefaultCurrency(currency);
        expect(service.defaultCurrency()).toBe(currency);
      });
    });
  });
});
