import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { RouterLink } from '@angular/router';

describe('HomeComponent', () => {
  async function setup() {
    return render(HomeComponent, {
      imports: [RouterLink],
    });
  }

  it('should render dashboard title and subtitle', async () => {
    await setup();
    expect(screen.getByText('Price Alert Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Monitor your price alerts and market movements')).toBeInTheDocument();
  });

  it('should display create alert button', async () => {
    await setup();
    const createButton = screen.getByText('Create Alert');
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveAttribute('href', '/alerts/create');
  });

  it('should display all stat cards', async () => {
    await setup();
    expect(screen.getByText('Active Alerts')).toBeInTheDocument();
    expect(screen.getByText('Triggered Today')).toBeInTheDocument();
    expect(screen.getByText('Markets Tracked')).toBeInTheDocument();
    expect(screen.getByText('Total Alerts')).toBeInTheDocument();
  });

  it('should display recent alerts section with empty state', async () => {
    await setup();
    expect(screen.getByText('Recent Alerts')).toBeInTheDocument();
    expect(screen.getByText('No alerts set yet')).toBeInTheDocument();
    const createFirstAlert = screen.getByText('Create your first alert');
    expect(createFirstAlert).toBeInTheDocument();
    expect(createFirstAlert).toHaveAttribute('href', '/alerts/create');
  });

  it('should display market overview section with empty state', async () => {
    await setup();
    expect(screen.getByText('Market Overview')).toBeInTheDocument();
    expect(screen.getByText('Start tracking markets to see overview')).toBeInTheDocument();
  });

  it('should have working navigation links', async () => {
    await setup();
    expect(screen.getByText('View All')).toHaveAttribute('href', '/alerts');
    expect(screen.getByText('View Markets')).toHaveAttribute('href', '/markets');
  });
});
