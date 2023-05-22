// Global
import { Story, Meta } from '@storybook/react';
// Local
import Iframe, { IframeProps } from './Iframe';
import defaultData from './Iframe.mock-data';

export default {
  title: 'General/Iframe',
  component: Iframe,
} as Meta;
const Template: Story<IframeProps> = (props) => <Iframe {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
