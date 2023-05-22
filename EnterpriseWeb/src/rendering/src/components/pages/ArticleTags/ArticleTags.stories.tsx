// Global
import { Story, Meta } from '@storybook/react';
// Local
import ArticleTags from './ArticleTags';
import defaultData from './ArticleTags.mock-data';

export default {
  title: 'Pages/ArticleTags',
  component: ArticleTags,
} as Meta;
const Template: Story<any> = (props) => <ArticleTags {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
