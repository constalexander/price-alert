import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// Create our custom preset based on Aura
const DarkPurplePreset = definePreset(Aura, {
  semantic: {
    // Primary color (purple)
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
    // Dark mode surfaces
    colorScheme: {
      dark: {
        surface: {
          0: '#1E1E2D',
          50: '#2A2A3C',
          100: '#252534',
          200: '#1E1E2D',
          300: '#18181F',
          400: '#121218',
          500: '#0C0C10',
          600: '#060608',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
      },
    },
  },
  // Component specific overrides
  components: {
    card: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.50}',
            color: '{surface.0}',
          },
        },
      },
    },
    panelmenu: {
      colorScheme: {
        dark: {
          root: {
            background: 'transparent',
          },
          header: {
            color: '{primary.300}',
            hoverBackground: 'rgba(255,255,255,0.03)',
          },
          content: {
            background: 'rgba(255,255,255,0.02)',
          },
          menuitem: {
            text: '{primary.300}',
            color: '{primary.300}',
            hoverBackground: 'rgba(255,255,255,0.05)',
          },
          submenuContent: {
            background: '{surface.50}',
          },
          submenuitem: {
            text: '{primary.200}',
            color: '{primary.200}',
            hoverBackground: 'rgba(255,255,255,0.08)',
          },
          action: {
            color: '{primary.200}',
            hoverBackground: 'rgba(255,255,255,0.08)',
          },
          icon: {
            color: '{primary.300}',
          },
          transition: 'background-color 0.2s, color 0.2s, box-shadow 0.2s',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideClientHydration(),
    providePrimeNG({
      theme: {
        preset: DarkPurplePreset,
        options: {
          mode: 'dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
};
