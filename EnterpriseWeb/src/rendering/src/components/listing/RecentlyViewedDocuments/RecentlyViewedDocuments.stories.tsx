// Global
import { Story, Meta } from '@storybook/react';
// Local
import RecentlyViewedDocuments, { RecentlyViewedDocumentsProps } from './RecentlyViewedDocuments';
import defaultData from './RecentlyViewedDocuments.mock-data';

export default {
  title: 'Listing/RecentlyViewedDocuments',
  component: RecentlyViewedDocuments,
} as Meta;
const Template: Story<RecentlyViewedDocumentsProps> = (props) => (
  <RecentlyViewedDocuments {...props} />
);
export const Default = Template.bind({});
Default.args = defaultData;
