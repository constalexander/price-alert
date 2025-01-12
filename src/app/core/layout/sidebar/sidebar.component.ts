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
      label: 'Dashboards',
      items: [{ label: 'E-Commerce', icon: 'pi pi-home', routerLink: '/e-commerce' }],
    },
    {
      label: 'Apps',
      items: [
        { label: 'Blog', icon: 'pi pi-book' },
        { label: 'Calendar', icon: 'pi pi-calendar' },
        { label: 'Chat', icon: 'pi pi-comments' },
        { label: 'Files', icon: 'pi pi-file' },
        { label: 'Kanban', icon: 'pi pi-table' },
        { label: 'Mail', icon: 'pi pi-envelope' },
        { label: 'Task List', icon: 'pi pi-check-square' },
      ],
    },
    {
      label: 'UI Kit',
      items: [
        { label: 'Form Layout', icon: 'pi pi-id-card' },
        { label: 'Input', icon: 'pi pi-pencil' },
        { label: 'Float Label', icon: 'pi pi-tag' },
        { label: 'Invalid State', icon: 'pi pi-exclamation-circle' },
        { label: 'Button', icon: 'pi pi-box' },
        { label: 'Table', icon: 'pi pi-table' },
        { label: 'List', icon: 'pi pi-list' },
        { label: 'Tree', icon: 'pi pi-sitemap' },
        { label: 'Panel', icon: 'pi pi-window-maximize' },
        { label: 'Overlay', icon: 'pi pi-clone' },
        { label: 'Media', icon: 'pi pi-image' },
        { label: 'Menu', icon: 'pi pi-bars' },
        { label: 'Message', icon: 'pi pi-comment' },
      ],
    },
  ];
}
