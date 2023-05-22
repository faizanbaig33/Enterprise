// Global
import { Story, Meta } from '@storybook/react';
// Local
import AWHeader, { AWHeaderProps } from './AWHeader';
import defaultData from './AWHeader.mock-data';
import HomeDepotlogoData from './AWHeader.mock-data-with-HomeDepotlogo';

export default {
  title: 'Site/AWHeader',
  component: AWHeader,
} as Meta;
const Template: Story<AWHeaderProps> = (props) => <AWHeader {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;

export const WithHomeDepotlogo = Template.bind({});
WithHomeDepotlogo.args = HomeDepotlogoData;
