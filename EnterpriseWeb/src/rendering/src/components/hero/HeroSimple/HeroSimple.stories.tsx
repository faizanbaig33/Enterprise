import { Story, Meta } from '@storybook/react';

// Local
import HeroSimple, { HeroSimpleProps } from './HeroSimple';
import defaultData from './HeroSimple.mock-data';
import withBlackBackgroundData from './HeroSimple.mock-data-black';
import withGrayBackgroundData from './HeroSimple.mock-data-gray';

export default {
  title: 'Hero/HeroSimple',
  component: HeroSimple,
} as Meta;

const Template: Story<HeroSimpleProps> = (props) => <HeroSimple {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const WithDarkBackgroundData = Template.bind({});
WithDarkBackgroundData.args = withBlackBackgroundData;

export const WithGrayBackgroundData = Template.bind({});
WithGrayBackgroundData.args = withGrayBackgroundData;
