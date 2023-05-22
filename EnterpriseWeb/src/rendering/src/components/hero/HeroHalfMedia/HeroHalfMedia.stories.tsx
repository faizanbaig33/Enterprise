// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeroHalfMedia, { HeroHalfMediaProps } from './HeroHalfMedia';
import defaultData from './HeroHalfMedia.mock-data';
import darkData from './HeroHalfMedia.mock-data-dark';
import leftAlignData from './HeroHalfMedia.mock-data-left-align';
import grayData from './HeroHalfMedia.mock-data-gray';
import videoData from './HeroHalfMedia.mock-data-video';

export default {
  title: 'Hero/HeroHalfMedia',
  component: HeroHalfMedia,
} as Meta;
const Template: Story<HeroHalfMediaProps> = (props) => <HeroHalfMedia {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const Dark = Template.bind({});
Dark.args = darkData;

export const LeftAlign = Template.bind({});
LeftAlign.args = leftAlignData;

export const Gray = Template.bind({});
Gray.args = grayData;

export const Video = Template.bind({});
Video.args = videoData;
