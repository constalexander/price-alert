import { test, expect } from '@playwright/test';

test.describe('Crypto Price Component', () => {
  test('should fetch and display bitcoin price', async ({ page }) => {
    await page.goto('/');

    // Fill in the crypto symbol
    const input = page.getByPlaceholderText(/enter crypto symbol/i);
    await input.fill('bitcoin');

    // Click the get price button
    const button = page.getByRole('button', { name: /get price/i });
    await button.click();

    // Wait for loading state
    await expect(page.getByRole('button', { name: /loading/i })).toBeVisible();

    // Wait for price to be displayed (the actual price will vary)
    await expect(page.getByText(/current price: \$/i)).toBeVisible();
  });

  test('should show error for invalid crypto symbol', async ({ page }) => {
    await page.goto('/');

    const input = page.getByPlaceholderText(/enter crypto symbol/i);
    await input.fill('invalid-coin');

    const button = page.getByRole('button', { name: /get price/i });
    await button.click();

    await expect(page.getByText(/price not found/i)).toBeVisible();
  });

  test('should have disabled button when input is empty', async ({ page }) => {
    await page.goto('/');

    const button = page.getByRole('button', { name: /get price/i });
    await expect(button).toBeDisabled();

    const input = page.getByPlaceholderText(/enter crypto symbol/i);
    await input.fill('btc');
    await expect(button).toBeEnabled();
  });
});
