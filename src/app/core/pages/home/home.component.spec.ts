import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  async function setup() {
    return render(HomeComponent);
  }

  it('should render welcome message', async () => {
    await setup();
    expect(screen.getByText('Welcome to Price Alert')).toBeInTheDocument();
  });

  it('should display main sections', async () => {
    await setup();
    expect(screen.getByText('Recent Alerts')).toBeInTheDocument();
    expect(screen.getByText('Price Trends')).toBeInTheDocument();
  });
});
