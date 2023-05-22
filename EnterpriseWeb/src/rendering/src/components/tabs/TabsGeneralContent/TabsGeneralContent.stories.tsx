// Global
import { Story, Meta } from '@storybook/react';
// Local
import TabsGeneralContent, { TabsGeneralContentProps } from './TabsGeneralContent';
import defaultData from './TabsGeneralContent.mock-data';
import threeTabsData from './TabsGeneralContent.mock-data-with-three-tabs';
import fourTabsData from './TabsGeneralContent.mock-data-with-four-tabs';
import fiveTabsData from './TabsGeneralContent.mock-data-with-five-tabs';
import sixTabsData from './TabsGeneralContent.mock-data-with-six-tabs';
import sevenTabsData from './TabsGeneralContent.mock-data-with-seven-tabs';

export default {
  title: 'Tabs/TabsGeneralContent',
  component: TabsGeneralContent,
} as Meta;
const Template: Story<TabsGeneralContentProps> = (props) => <TabsGeneralContent {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;

export const threeTabs = Template.bind({});
threeTabs.args = threeTabsData;

export const fourTabs = Template.bind({});
fourTabs.args = fourTabsData;

export const fiveTabs = Template.bind({});
fiveTabs.args = fiveTabsData;

export const sixTabs = Template.bind({});
sixTabs.args = sixTabsData;

export const sevenTabs = Template.bind({});
sevenTabs.args = sevenTabsData;
