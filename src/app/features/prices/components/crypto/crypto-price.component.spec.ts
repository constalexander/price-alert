import { ComponentFixture } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { of, throwError } from 'rxjs';
import { CryptoPriceComponent } from './crypto-price.component';
import { CryptoService } from '@/core/services/crypto.service';

describe('CryptoPriceComponent', () => {
  const mockCryptoService = {
    getCryptoPrice: jest.fn(),
  };

  async function setup() {
    return render(CryptoPriceComponent, {
      providers: [{ provide: CryptoService, useValue: mockCryptoService }],
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
    mockCryptoService.getCryptoPrice.mockReturnValue(of(50000));
    await setup();

    const input = screen.getByPlaceholderText(/enter crypto symbol/i);
    await fireEvent.input(input, { target: { value: 'bitcoin' } });

    const button = screen.getByRole('button', { name: /get price/i });
    await fireEvent.click(button);

    expect(await screen.findByText('Current price: $50000')).toBeInTheDocument();
    expect(mockCryptoService.getCryptoPrice).toHaveBeenCalledWith('bitcoin');
  });

  it('should display error message when price fetch fails', async () => {
    const errorMessage = 'Price not found for invalid-coin';
    mockCryptoService.getCryptoPrice.mockReturnValue(throwError(() => new Error(errorMessage)));
    await setup();

    const input = screen.getByPlaceholderText(/enter crypto symbol/i);
    await fireEvent.input(input, { target: { value: 'invalid-coin' } });

    const button = screen.getByRole('button', { name: /get price/i });
    await fireEvent.click(button);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should disable button when input is empty', async () => {
    await setup();
    const button = screen.getByRole('button', { name: /get price/i });
    expect(button).toBeDisabled();
  });

  it('should show loading state while fetching price', async () => {
    mockCryptoService.getCryptoPrice.mockReturnValue(of(50000));
    await setup();

    const input = screen.getByPlaceholderText(/enter crypto symbol/i);
    await fireEvent.input(input, { target: { value: 'bitcoin' } });

    const button = screen.getByRole('button', { name: /get price/i });
    await fireEvent.click(button);

    expect(screen.getByRole('button', { name: /loading/i })).toBeInTheDocument();
  });
});
