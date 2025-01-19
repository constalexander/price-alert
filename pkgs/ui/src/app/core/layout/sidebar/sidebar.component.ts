import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService, UserRole } from '@/features/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, PanelMenuModule, RouterLink, ButtonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private authService = inject(AuthService);
  menuItems$ = this.authService.currentUser$.pipe(map((user) => this.buildMenuItems(user || null)));

  private buildMenuItems(user: any): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        expanded: true,
        items: [
          {
            label: 'Overview',
            icon: 'pi pi-home',
            routerLink: '/',
          },
        ],
      },
    ];

    if (user) {
      menuItems.push({
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-user',
            routerLink: '/settings',
          },
        ],
      });
    }

    if (user?.role === UserRole.SUPER_USER) {
      const dashboardMenu = menuItems.find((item) => item.label === 'Dashboard');
      if (dashboardMenu?.items) {
        dashboardMenu.items.push({
          label: 'Sandbox',
          icon: 'pi pi-code',
          routerLink: '/sandbox',
        });
      }
    }

    return menuItems;
  }
}
