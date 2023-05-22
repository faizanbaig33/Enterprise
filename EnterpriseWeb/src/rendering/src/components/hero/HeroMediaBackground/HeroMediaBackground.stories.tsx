// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeroMediaBackground, { HeroMediaBackgroundProps } from './HeroMediaBackground';
import defaultData from './HeroMediaBackground.mock-data';
import overlayData from './HeroMediaBackground.mock-data-overlay';

export default {
  title: 'Hero/HeroMediaBackground',
  component: HeroMediaBackground,
} as Meta;
const Template: Story<HeroMediaBackgroundProps> = (props) => <HeroMediaBackground {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
export const Overlay = Template.bind({});
Overlay.args = overlayData;
