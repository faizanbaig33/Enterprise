// Global
import { Story, Meta } from '@storybook/react';
// Local
import XupCardCollection, { XupCardCollectionProps } from './XupCardCollection';
import defaultData from './XupCardCollection.mock-data';

export default {
  title: 'Listing/XupCardCollection',
  component: XupCardCollection,
} as Meta;
const Template: Story<XupCardCollectionProps> = (props) => <XupCardCollection {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
