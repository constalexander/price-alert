import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { CreateAlertButtonComponent } from '@/features/alerts/components/buttons/create-alert-button.component';

describe('HomeComponent', () => {
  async function setup() {
    return render(HomeComponent, {
      imports: [CreateAlertButtonComponent],
    });
  }

  it('should display the dashboard title', async () => {
    await setup();
    expect(screen.getByText('Price Alert Dashboard')).toBeInTheDocument();
  });

  it('should display all stat cards', async () => {
    await setup();
    expect(screen.getByText('Active Alerts')).toBeInTheDocument();
    expect(screen.getByText('Triggered Today')).toBeInTheDocument();
    expect(screen.getByText('Total Alerts')).toBeInTheDocument();
  });

  it('should display recent alerts section with empty state', async () => {
    await setup();
    expect(screen.getByText('Recent Alerts')).toBeInTheDocument();
    expect(screen.getByText('No alerts set yet')).toBeInTheDocument();
  });

  it('should have working navigation links', async () => {
    await setup();
    expect(screen.getByText('View All')).toHaveAttribute('href', '/alerts');
  });
});
