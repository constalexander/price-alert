import type { Meta, StoryObj } from '@storybook/angular';
import { MetalPriceComponent } from './metal-price.component';
import { MetalService } from '@/core/services/metal.service';
import { SettingsService } from '@/core/services/settings.service';
import { of } from 'rxjs';

const mockMetalService = {
  getGoldPrice: () => of(1856.9),
};

const mockSettingsService = {
  defaultCurrency: () => 'usd',
};

const meta: Meta<MetalPriceComponent> = {
  title: 'Features/Prices/MetalPrice',
  component: MetalPriceComponent,
  providers: [
    { provide: MetalService, useValue: mockMetalService },
    { provide: SettingsService, useValue: mockSettingsService },
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<MetalPriceComponent>;

export const Default: Story = {
  args: {},
};
