// Global
import { Story, Meta } from '@storybook/react';
// Local
import GlobalMasthead, { GlobalMastheadProps } from './GlobalMasthead';
import defaultData from './GlobalMasthead.mock-data';

export default {
  title: 'General/GlobalMasthead',
  component: GlobalMasthead,
} as Meta;
const Template: Story<GlobalMastheadProps> = (props) => <GlobalMasthead {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
