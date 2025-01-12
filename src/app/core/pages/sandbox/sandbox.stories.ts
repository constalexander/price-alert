import type { Meta, StoryObj } from '@storybook/angular';
import { SandboxComponent } from './sandbox.component';

const meta: Meta<SandboxComponent> = {
  title: 'Pages/Sandbox',
  component: SandboxComponent,
  tags: ['autodocs'],
  render: (args: SandboxComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<SandboxComponent>;

export const Default: Story = {
  args: {},
};
