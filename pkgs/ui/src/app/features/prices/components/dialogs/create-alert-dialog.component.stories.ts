import type { Meta, StoryObj } from '@storybook/angular';
import { CreateAlertDialogComponent } from './create-alert-dialog.component';

const meta: Meta<CreateAlertDialogComponent> = {
  title: 'Features/Prices/Dialogs/CreateAlertDialog',
  component: CreateAlertDialogComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<CreateAlertDialogComponent>;

export const Default: Story = {
  args: {
    visible: true,
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};
