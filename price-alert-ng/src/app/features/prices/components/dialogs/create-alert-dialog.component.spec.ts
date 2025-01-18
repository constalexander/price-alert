import { render, screen } from '@testing-library/angular';
import { CreateAlertDialogComponent } from './create-alert-dialog.component';
import { DialogModule } from 'primeng/dialog';

describe('CreateAlertDialogComponent', () => {
  const setup = async () => {
    return render(CreateAlertDialogComponent, {
      imports: [DialogModule],
    });
  };

  it('should create', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be hidden by default', async () => {
    await setup();
    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });

  it('should show dialog when show() is called', async () => {
    const { fixture } = await setup();
    fixture.componentInstance.show();
    fixture.detectChanges();

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should hide dialog when hide() is called', async () => {
    const { fixture } = await setup();

    // First show the dialog
    fixture.componentInstance.show();
    fixture.detectChanges();

    // Then hide it
    fixture.componentInstance.hide();
    fixture.detectChanges();

    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });
});
