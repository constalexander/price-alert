import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@/features/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, PanelMenuModule, RouterLink, ButtonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private authService = inject(AuthService);
  menuItems$ = this.authService.currentUser$.pipe(map(() => this.buildMenuItems()));

  private buildMenuItems(): MenuItem[] {
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

    if (this.authService.isAuthenticatedUser()) {
      menuItems.push({
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-user',
            routerLink: '/account',
          },
          {
            label: 'Preferences',
            icon: 'pi pi-sliders-h',
            routerLink: '/preferences',
          },
        ],
      });

      if (this.authService.isSuperUser()) {
        const dashboardMenu = menuItems.find((item) => item.label === 'Dashboard');
        if (dashboardMenu?.items) {
          dashboardMenu.items.push({
            label: 'Sandbox',
            icon: 'pi pi-code',
            routerLink: '/sandbox',
          });
        }
      }
    }

    return menuItems;
  }
}
