import { test, expect } from '@playwright/test';

test.describe('Price Alert App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Home Page', () => {
    test('should display dashboard layout correctly', async ({ page }) => {
      // Check main heading
      await expect(page.getByRole('heading', { name: 'Price Alert Dashboard' })).toBeVisible();
      await expect(page.getByText('Monitor your price alerts and market movements')).toBeVisible();

      // Check create alert button
      const createButton = page.getByRole('link', { name: 'Create Alert' });
      await expect(createButton).toBeVisible();
      expect(await createButton.getAttribute('href')).toBe('/alerts/create');

      // Check stat cards
      await expect(page.getByText('Active Alerts')).toBeVisible();
      await expect(page.getByText('Triggered Today')).toBeVisible();
      await expect(page.getByText('Markets Tracked')).toBeVisible();
      await expect(page.getByText('Total Alerts')).toBeVisible();

      // Check recent alerts section
      await expect(page.getByRole('heading', { name: 'Recent Alerts' })).toBeVisible();
      await expect(page.getByText('No alerts set yet')).toBeVisible();
      const createFirstAlert = page.getByRole('link', { name: 'Create your first alert' });
      await expect(createFirstAlert).toBeVisible();
      expect(await createFirstAlert.getAttribute('href')).toBe('/alerts/create');

      // Check market overview section
      await expect(page.getByRole('heading', { name: 'Market Overview' })).toBeVisible();
      await expect(page.getByText('Start tracking markets to see overview')).toBeVisible();
    });

    test('should have working navigation links', async ({ page }) => {
      // Check "View All" link
      const viewAllLink = page.getByRole('link', { name: 'View All' });
      await expect(viewAllLink).toBeVisible();
      expect(await viewAllLink.getAttribute('href')).toBe('/alerts');

      // Check "View Markets" link
      const viewMarketsLink = page.getByRole('link', { name: 'View Markets' });
      await expect(viewMarketsLink).toBeVisible();
      expect(await viewMarketsLink.getAttribute('href')).toBe('/markets');
    });
  });

  test.describe('Sidebar Navigation', () => {
    test('should display all main navigation sections', async ({ page }) => {
      await expect(page.getByText('Dashboard')).toBeVisible();
      await expect(page.getByText('Price Alerts')).toBeVisible();
      await expect(page.getByText('Markets')).toBeVisible();
      await expect(page.getByText('Settings')).toBeVisible();
    });

    test('should expand Dashboard section and navigate', async ({ page }) => {
      await page.getByText('Dashboard').click();
      await expect(page.getByText('Overview')).toBeVisible();

      await page.getByText('Overview').click();
      await expect(page).toHaveURL('/');
    });

    test('should expand Price Alerts section and navigate', async ({ page }) => {
      await page.getByText('Price Alerts').click();
      await expect(page.getByText('My Alerts')).toBeVisible();
      await expect(page.getByText('Create Alert')).toBeVisible();

      await page.getByText('My Alerts').click();
      await expect(page).toHaveURL('/alerts');

      await page.getByText('Create Alert').click();
      await expect(page).toHaveURL('/alerts/create');
    });

    test('should expand Markets section and navigate', async ({ page }) => {
      await page.getByText('Markets').click();
      await expect(page.getByText('Stocks')).toBeVisible();
      await expect(page.getByText('ETFs')).toBeVisible();
      await expect(page.getByText('Crypto')).toBeVisible();
      await expect(page.getByText('Precious Metals')).toBeVisible();

      await page.getByText('Stocks').click();
      await expect(page).toHaveURL('/markets/stocks');
    });

    test('should expand Settings section and navigate', async ({ page }) => {
      await page.getByText('Settings').click();
      await expect(page.getByText('Notifications')).toBeVisible();
      await expect(page.getByText('Account')).toBeVisible();

      await page.getByText('Notifications').click();
      await expect(page).toHaveURL('/settings/notifications');
    });
  });
});
