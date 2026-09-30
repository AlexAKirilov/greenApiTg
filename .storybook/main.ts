import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createGreenApiProxyEntry } = require('../webpack/greenApiProxy');

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },

  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
      '@/features/poll-notifications': path.resolve(__dirname, './mocks/poll-notifications.ts'),
    };

    config.devServer = {
      ...config.devServer,
      proxy: [createGreenApiProxyEntry()],
    };

    return config;
  }
};
export default config;