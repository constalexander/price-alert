import { ComponentFixture } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { of, throwError } from 'rxjs';
import { MetalPriceComponent } from './metal-price.component';
import { MetalService } from '@/core/services/metal.service';
import { SettingsService } from '@/core/services/settings.service';

describe('MetalPriceComponent', () => {
  const mockMetalService = {
    getGoldPrice: jest.fn(),
  };

  const mockSettingsService = {
    defaultCurrency: jest.fn().mockReturnValue('usd'),
  };

  async function setup() {
    return render(MetalPriceComponent, {
      providers: [
        { provide: MetalService, useValue: mockMetalService },
        { provide: SettingsService, useValue: mockSettingsService },
      ],
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should display price when fetched successfully', async () => {
    mockMetalService.getGoldPrice.mockReturnValue(of(1856.9));
    await setup();

    const goldButton = screen.getByRole('button', { name: /gold/i });
    await fireEvent.click(goldButton);

    const getPriceButton = screen.getByRole('button', { name: /get price/i });
    await fireEvent.click(getPriceButton);

    expect(await screen.findByText('$1,856.90')).toBeInTheDocument();
    expect(mockMetalService.getGoldPrice).toHaveBeenCalledWith('usd');
  });

  it('should display error message when price fetch fails', async () => {
    const errorMessage = 'Failed to fetch metal price';
    mockMetalService.getGoldPrice.mockReturnValue(throwError(() => new Error(errorMessage)));
    await setup();

    const goldButton = screen.getByRole('button', { name: /gold/i });
    await fireEvent.click(goldButton);

    const getPriceButton = screen.getByRole('button', { name: /get price/i });
    await fireEvent.click(getPriceButton);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should disable button when no metal is selected', async () => {
    await setup();
    const button = screen.getByRole('button', { name: /get price/i });
    expect(button).toBeDisabled();
  });

  it('should show loading state while fetching price', async () => {
    mockMetalService.getGoldPrice.mockReturnValue(of(1856.9));
    await setup();

    const goldButton = screen.getByRole('button', { name: /gold/i });
    await fireEvent.click(goldButton);

    const getPriceButton = screen.getByRole('button', { name: /get price/i });
    await fireEvent.click(getPriceButton);

    expect(screen.getByRole('button', { name: /loading/i })).toBeInTheDocument();
  });
});
