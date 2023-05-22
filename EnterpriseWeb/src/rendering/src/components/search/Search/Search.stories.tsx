// Global
import { Story, Meta } from '@storybook/react';
// Local
import Search, { SearchProps } from './Search';
import defaultData from './Search.mock-data';

export default {
  title: 'Search/Search',
  component: Search,
} as Meta;
const Template: Story<SearchProps> = (props) => <Search {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
