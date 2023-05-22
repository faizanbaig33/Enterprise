// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeroTwoColumn, { HeroTwoColumnProps } from './HeroTwoColumn';
import defaultData from './HeroTwoColumn.mock-data';

export default {
  title: 'Hero/HeroTwoColumn',
  component: HeroTwoColumn,
} as Meta;
const Template: Story<HeroTwoColumnProps> = (props) => <HeroTwoColumn {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
