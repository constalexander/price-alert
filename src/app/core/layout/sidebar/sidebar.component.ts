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
      icon: 'pi pi-th-large',
      items: [
        { label: 'Overview', icon: 'pi pi-home', routerLink: '/' },
        { label: 'Sandbox', icon: 'pi pi-code', routerLink: '/sandbox' },
      ],
    },
    {
      label: 'Price Alerts',
      icon: 'pi pi-bell',
      items: [
        { label: 'My Alerts', icon: 'pi pi-list', routerLink: '/alerts' },
        { label: 'Create Alert', icon: 'pi pi-plus', routerLink: '/alerts/create' },
      ],
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [{ label: 'Account', icon: 'pi pi-user', routerLink: '/settings' }],
    },
  ];
}
