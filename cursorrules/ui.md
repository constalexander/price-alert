# UI

## Tech stack:

- Angular 19
- Prettier
- Tailwind CSS
- SCSS
- Jest and Testing Library
- Playwright
- Storybook and Compodoc
- PrimeNG

## Third Party APIs

- CoinGecko

```undecided
- Alpha Vantage
- Kitco
```

## Requirements

- Do things "The Angular Way"
- Use as many new, modern Angular features as possible: SSR, standalone
- Prefer using Angular CLI
- High degree of modularity, separation of concerns, and reusability
- Every code change should also include a story in Storybook
- Every code change should also include Jest unit tests, but written in the Testing Library style. Remember one of the guiding principles is to write tests resemble the way the app is actually used.
- Does it use Tailwind? If the code change has CSS changes, can those changes be done in Tailwind instead?
- Default to OnPush change detection for every new component
- Don't create components with styleUrls nor .scss files because we are using Tailwind
- Use separate HTML files for templates (no inline templates)
- Use named imports when importing modules (no relative paths)
- Always make it responsive - from 320px all the way up to ultrawide monitors
- Do not ever ever ever modify app.config.ts
- Don't put standalone: true in the component decorator
- Always prefer to use inject() over constructor
