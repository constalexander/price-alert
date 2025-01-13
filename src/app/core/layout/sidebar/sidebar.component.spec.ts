import { render, screen } from '@testing-library/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar.component';
import userEvent from '@testing-library/user-event';

describe('SidebarComponent', () => {
  async function setup() {
    return render(SidebarComponent, {
      imports: [NoopAnimationsModule],
    });
  }

  it('should render the sidebar with navigation sections', async () => {
    await setup();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Price Alerts')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should display dashboard items when expanded', async () => {
    await setup();

    await userEvent.click(screen.getByText('Dashboard'));
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('should display price alerts menu items when expanded', async () => {
    await setup();

    await userEvent.click(screen.getByText('Price Alerts'));
    expect(screen.getByText('My Alerts')).toBeInTheDocument();
    expect(screen.getByText('Create Alert')).toBeInTheDocument();
  });

  it('should display settings menu items when expanded', async () => {
    await setup();

    await userEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('should have working navigation links', async () => {
    await setup();

    await userEvent.click(screen.getByText('Dashboard'));
    const overviewLink = screen.getByText('Overview');
    expect(overviewLink).toHaveAttribute('href', '/');

    await userEvent.click(screen.getByText('Price Alerts'));
    const createAlertLink = screen.getByText('Create Alert');
    expect(createAlertLink).toHaveAttribute('href', '/alerts/create');
  });
});
