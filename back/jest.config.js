module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/config/ormconfig.test.ts',
  ],
};
