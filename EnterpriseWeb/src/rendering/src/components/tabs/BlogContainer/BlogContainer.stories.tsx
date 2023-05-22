// Global
import { Story, Meta } from '@storybook/react';
// Local
import BlogContainer, { BlogContainerProps } from './BlogContainer';
import defaultData from './BlogContainer.mock-data';

export default {
  title: 'Tabs/BlogContainer',
  component: BlogContainer,
} as Meta;
const Template: Story<BlogContainerProps> = (props) => <BlogContainer {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
