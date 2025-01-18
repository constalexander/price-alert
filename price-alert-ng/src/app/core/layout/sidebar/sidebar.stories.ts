import { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

const meta: Meta<SidebarComponent> = {
  title: 'Layout/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  render: (args: SidebarComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Default: Story = {
  args: {},
};
