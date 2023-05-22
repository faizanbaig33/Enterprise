// Global
import { Story, Meta } from '@storybook/react';
// Local
import ContentBlockWithSidebar, { ContentBlockWithSidebarProps } from './ContentBlockWithSidebar';
import defaultData from './ContentBlockWithSidebar.mock-data';

export default {
  title: 'General/ContentBlockWithSidebar',
  component: ContentBlockWithSidebar,
} as Meta;
const Template: Story<ContentBlockWithSidebarProps> = (props) => (
  <ContentBlockWithSidebar {...props} />
);
export const Default = Template.bind({});
Default.args = defaultData;
