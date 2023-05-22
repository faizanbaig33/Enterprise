import { Story, Meta } from '@storybook/react';

// Local
import HeroWithNavigation, { HeroWithNavigationProps } from './HeroWithNavigation';
import defaultData from './HeroWithNavigation.mock-data';

export default {
  title: 'Hero/HeroWithNavigation',
  component: HeroWithNavigation,
} as Meta;

const Template: Story<HeroWithNavigationProps> = (props) => <HeroWithNavigation {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
