// Global
import { Story, Meta } from '@storybook/react';
// Local
import BlogQuote, { BlogQuoteProps } from './BlogQuote';
import defaultData from './BlogQuote.mock-data';

export default {
  title: 'General/BlogQuote',
  component: BlogQuote,
} as Meta;
const Template: Story<BlogQuoteProps> = (props) => <BlogQuote {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
