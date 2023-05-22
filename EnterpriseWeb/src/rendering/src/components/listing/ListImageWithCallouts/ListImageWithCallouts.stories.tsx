// Global
import { Story, Meta } from '@storybook/react';
// Local
import ListImageWithCallouts, { ListImageWithCalloutsProps } from './ListImageWithCallouts';
import defaultData from './ListImageWithCallouts.mock-data';

export default {
  title: 'Listing/ListImageWithCallouts',
  component: ListImageWithCallouts,
} as Meta;
const Template: Story<ListImageWithCalloutsProps> = (props) => <ListImageWithCallouts {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
