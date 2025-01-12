import { Routes } from '@angular/router';
import { SandboxComponent } from './core/pages/sandbox/sandbox.component';
import { HomeComponent } from './core/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'sandbox',
    component: SandboxComponent,
    title: 'Sandbox',
  },
];
