import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    '^@/env/(.*)$': '<rootDir>/src/environments/$1',
    '^@/(.*)$': '<rootDir>/src/app/$1',
  },
};

export default jestConfig;
