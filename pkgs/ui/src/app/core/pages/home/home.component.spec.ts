/// <reference types="jest" />
import '@testing-library/jest-dom';
import { render } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { CreateAlertButtonComponent } from '@/features/alerts/components/buttons/create-alert-button.component';
import { HomePo } from './home.po';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let page: HomePo;

  async function setup() {
    await render(HomeComponent, {
      imports: [CreateAlertButtonComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient()],
    });
    page = new HomePo();
    return { page };
  }

  it('should display all stat cards', async () => {
    await setup();
    expect(page.totalAlertsCard).toBeInTheDocument();
    expect(page.triggeredTodayCard).toBeInTheDocument();
  });

  it('should display recent alerts section with empty state', async () => {
    await setup();
    expect(page.recentAlertsTitle).toBeInTheDocument();
    expect(page.emptyStateMessage).toBeInTheDocument();
  });

  it('should have working navigation links', async () => {
    await setup();
    expect(page.viewAllLink).toHaveAttribute('href', '/alerts');
  });
});
