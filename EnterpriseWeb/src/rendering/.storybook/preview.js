import React from 'react';
import { SitecoreContextReactContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ThemeContext } from 'lib/context/ThemeContext';

// Global stylesheet for components.
import '../src/assets/app.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  breakpoints: {
    breakpointNames: {
      default: '0',
      sm: '375',
      md: '672',
      lg: '1200',
      xl: '1440',
      '2xl': '1536',
    },
    debounceTimeout: 200,
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      large: {
        name: 'Large Screen',
        styles: {
          width: '1280px',
          height: '768px',
        },
      },
      extraLarge: {
        name: 'Extra Large Screen',
        styles: {
          width: '1440px',
          height: '1080px',
        },
      },
    },
  },
};

export const mockSitecoreContext = {
  context: {
    pageEditing: false,
    Languages: [
      {
        Name: 'en',
      },
      {
        Name: 'en-US',
      },
      {
        Name: 'en-CA',
      },
    ],
  },
  setContext: () => {
    // nothing
  },
};

export const globalTypes = {
  themeName: {
    name: 'Theme',
    // Text that will be shown on icon hover
    description: 'Choose a site theme',
    defaultValue: 'aw',
    toolbar: {
      /**
       * You can check all available icons by this link:
       * https://storybook.js.org/docs/riot/workflows/faq#what-icons-are-available-for-my-toolbar-or-my-addon
       */
      icon: 'chromatic',
      items: [
        { value: 'aw', right: 'AW', title: 'Andersen Windows' },
        { value: 'rba', right: 'RbA', title: 'Renewal by Andersen' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => (
    <div className={context.globals.themeName}>
      <ThemeContext.Provider value={context.globals.themeName}>
        <SitecoreContextReactContext.Provider value={mockSitecoreContext}>
          <Story />
        </SitecoreContextReactContext.Provider>
      </ThemeContext.Provider>
    </div>
  ),
];
