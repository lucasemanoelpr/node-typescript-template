const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  testEnvironment: 'jsdom',
  rootDir: 'src',
  testMatch: [
    '<rootDir>/**/*.test.ts',
    '**/*.pacttest.(ts)',
    '**/*.pactverify.(ts)',
  ],
  automock: false,
  clearMocks: false,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      lines: 0,
      functions: 0,
    },
  },
  setupFiles: ['./jest.setup.ts'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  testTimeout: 300000,
}
