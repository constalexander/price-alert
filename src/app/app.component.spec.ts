import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', async () => {
    await render(AppComponent);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render title', async () => {
    await render(AppComponent);
    expect(screen.getByText(/price-alert/i)).toBeInTheDocument();
  });
});
