// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeroProductTabs, { HeroProductTabsProps } from './HeroProductTabs';
import defaultData from './HeroProductTabs.mock-data';
import fourTabsData from './HeroProductTabs.mock-data-with-four-tabs';

export default {
  title: 'Hero/HeroProductTabs',
  component: HeroProductTabs,
} as Meta;
const Template: Story<HeroProductTabsProps> = (props) => <HeroProductTabs {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const fourTabs = Template.bind({});
fourTabs.args = fourTabsData;
