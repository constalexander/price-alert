import { render, screen } from '@testing-library/angular';
import { SidebarComponent } from './sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import userEvent from '@testing-library/user-event';

describe('SidebarComponent', () => {
  async function setup() {
    return render(SidebarComponent, {
      imports: [NoopAnimationsModule],
    });
  }

  it('should render the sidebar with navigation sections', async () => {
    await setup();

    expect(screen.getByText('Dashboards')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();
    expect(screen.getByText('UI Kit')).toBeInTheDocument();
  });

  it('should display dashboard items when expanded', async () => {
    await setup();

    await userEvent.click(screen.getByText('Dashboards'));
    expect(screen.getByText('E-Commerce')).toBeInTheDocument();
  });

  it('should display apps menu items when expanded', async () => {
    await setup();

    await userEvent.click(screen.getByText('Apps'));
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('should display UI Kit menu items when expanded', async () => {
    await setup();

    await userEvent.click(screen.getByText('UI Kit'));
    expect(screen.getByText('Form Layout')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('should have working navigation links', async () => {
    await setup();

    await userEvent.click(screen.getByText('Dashboards'));
    const eCommerceLink = screen.getByText('E-Commerce');
    expect(eCommerceLink).toHaveAttribute('href', '/e-commerce');
  });
});
