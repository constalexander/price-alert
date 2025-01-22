import { screen } from '@testing-library/angular';

export class HomePo {
  get totalAlertsCard() {
    return screen.getByText('Total Alerts');
  }

  get triggeredTodayCard() {
    return screen.getByText('Triggered Today');
  }

  get recentAlertsTitle() {
    return screen.getByText('Recent Alerts');
  }

  get emptyStateMessage() {
    return screen.getByText('No alerts set yet');
  }

  get viewAllLink() {
    return screen.getByText('View All');
  }
}
