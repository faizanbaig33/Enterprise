// Global
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Story, Meta } from '@storybook/react';
import { createComponentFactory } from 'lib/mocks/mock-placeholder';
// Local
import Split2575, { Split2575Props } from './Split2575';
import defaultData from './Split2575.mock-data';

const componentFactory = createComponentFactory();

export default {
  title: 'Layout/Split2575',
  component: Split2575,
  decorators: [
    (Story) => <SitecoreContext componentFactory={componentFactory}>{Story()}</SitecoreContext>,
  ],
};

const Template = (props) => <Split2575 {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
