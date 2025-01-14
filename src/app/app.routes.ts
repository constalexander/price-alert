import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'sandbox',
    loadComponent: () => import('./core/pages/sandbox/sandbox.component').then((m) => m.SandboxComponent),
    title: 'Sandbox',
  },
  {
    path: 'settings',
    loadComponent: () => import('./core/pages/settings/settings.component').then((m) => m.SettingsComponent),
    title: 'Settings',
  },
];
