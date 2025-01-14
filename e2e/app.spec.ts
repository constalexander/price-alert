import { test, expect } from '@playwright/test';

test.describe('Price Alert App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Home Page', () => {
    test('should display the title', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Price Alert Dashboard' })).toBeVisible();
    });

    test('should display the create alert button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Create Alert' })).toBeVisible();
    });

    test('should display all dashboard cards', async ({ page }) => {
      await expect(page.getByText('Active Alerts')).toBeVisible();
      await expect(page.getByText('Triggered Today')).toBeVisible();
      await expect(page.getByText('Markets Tracked')).toBeVisible();
      await expect(page.getByText('Total Alerts')).toBeVisible();
    });

    test('should display recent alerts section', async ({ page }) => {
      await expect(page.getByText('Recent Alerts')).toBeVisible();
      await expect(page.getByText('No alerts set yet')).toBeVisible();
    });

    test('should have working navigation links', async ({ page }) => {
      // Check "View All" link
      const viewAllLink = page.getByRole('link', { name: 'View All' });
      await expect(viewAllLink).toBeVisible();
      expect(await viewAllLink.getAttribute('href')).toBe('/alerts');
    });
  });

  test.describe('Sidebar Navigation', () => {
    test('should display all main navigation sections', async ({ page }) => {
      await expect(page.getByText('Dashboard')).toBeVisible();
      await expect(page.getByText('Price Alerts')).toBeVisible();
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
  });
});
