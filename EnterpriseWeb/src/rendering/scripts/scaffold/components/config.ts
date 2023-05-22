/* eslint-disable */
import { Config } from './utils';

import { componentTemplate } from './templates/component';
import { jestTemplate } from './templates/jest';
import { mockDataTemplate } from './templates/mockdata';
import { storybookTemplate } from './templates/storybook';
import { reactTemplate } from './templates/react';
import { themeTemplate } from './templates/theme';

const componentsFolderConfig: Config = {
  directories: [
    {
      path: 'general',
      name: 'General',
      dataComponent: 'general/',
      storybook: 'General/',
    },
    {
      path: 'hero',
      name: 'Hero',
      dataComponent: 'hero/',
      storybook: 'Hero/',
    },
    {
      path: 'layout',
      name: 'Layout',
      dataComponent: 'layout/',
      storybook: 'Layout/',
    },
    {
      path: 'listing',
      name: 'Listing',
      dataComponent: 'listing/',
      storybook: 'Listing/',
    },
    {
      path: 'modal',
      name: 'Modal',
      dataComponent: 'modal/',
      storybook: 'Modal/',
    },
    {
      path: 'promo',
      name: 'Promo',
      dataComponent: 'promo/',
      storybook: 'Promo/',
    },
    {
      path: 'site',
      name: 'Site',
      dataComponent: 'site/',
      storybook: 'Site/',
    },
    {
      path: 'search',
      name: 'Search',
      dataComponent: 'search/',
      storybook: 'Search/',
    },
    {
      path: 'tabs',
      name: 'Tabs',
      dataComponent: 'tabs/',
      storybook: 'Tabs/',
    },
    {
      path: 'helpers',
      name: 'Helpers',
      dataComponent: 'helpers/',
      storybook: 'Helpers/',
      templates: {
        '[name].tsx': reactTemplate
      },
    },
  ],
  templates: {
    '[name].tsx': componentTemplate,
    '[name].test.js': jestTemplate,
    '[name].stories.tsx': storybookTemplate,
    '[name].mock-data.js': mockDataTemplate,
    '[name].theme.tsx': themeTemplate,
  },
  questions: [
    {
      name: 'jssOpts',
      type: 'checkbox',
      message: 'Select any customizations needed for your component:',
      choices: [
        { name: 'Contains a Placeholder component', value: 'hasPlaceholder' },
        {
          name: 'Uses data from getStaticProps (connected GraphQL or other server-side API calls)',
          value: 'hasGetStaticProps',
        },
        { name: 'Contains a next/dynamic import', value: 'hasNextDynamic' },
      ],
    },
  ],
};

export default componentsFolderConfig;
