import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, PanelMenuModule, RouterLink],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      items: [{ label: 'Overview', icon: 'pi pi-home', routerLink: '/' }],
    },
    {
      label: 'Price Alerts',
      items: [
        { label: 'My Alerts', icon: 'pi pi-bell', routerLink: '/alerts' },
        { label: 'Create Alert', icon: 'pi pi-plus', routerLink: '/alerts/create' },
      ],
    },
    {
      label: 'Markets',
      items: [
        { label: 'Stocks', icon: 'pi pi-chart-line', routerLink: '/markets/stocks' },
        { label: 'ETFs', icon: 'pi pi-chart-bar', routerLink: '/markets/etfs' },
        { label: 'Crypto', icon: 'pi pi-bitcoin', routerLink: '/markets/crypto' },
        { label: 'Precious Metals', icon: 'pi pi-dollar', routerLink: '/markets/metals' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { label: 'Notifications', icon: 'pi pi-bell', routerLink: '/settings/notifications' },
        { label: 'Account', icon: 'pi pi-user', routerLink: '/settings/account' },
      ],
    },
  ];
}
