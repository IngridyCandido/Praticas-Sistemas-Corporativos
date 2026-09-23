import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          resolvePackageJsonExports: true,
          target: 'ES2023',
          esModuleInterop: true,
          isolatedModules: true,
        },
      },
    ],
  },
};

export default config;