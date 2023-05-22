// Global
import { Story, Meta } from '@storybook/react';
// Local
import AWFooter, { AWFooterProps } from './AWFooter';
import defaultData from './AWFooter.mock-data';

export default {
  title: 'Site/AWFooter',
  component: AWFooter,
} as Meta;
const Template: Story<AWFooterProps> = (props) => <AWFooter {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
