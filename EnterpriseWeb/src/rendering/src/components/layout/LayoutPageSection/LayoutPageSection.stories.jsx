// Global
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Story, Meta } from '@storybook/react';
import { createComponentFactory } from 'lib/mocks/mock-placeholder';
// Local
import LayoutPageSection, { LayoutPageSectionProps } from './LayoutPageSection';
import defaultData from './LayoutPageSection.mock-data';

const componentFactory = createComponentFactory();

export default {
  title: 'Layout/LayoutPageSection',
  component: LayoutPageSection,
  decorators: [
    (Story) => <SitecoreContext componentFactory={componentFactory}>{Story()}</SitecoreContext>,
  ],
};

const Template = (props) => <LayoutPageSection {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
