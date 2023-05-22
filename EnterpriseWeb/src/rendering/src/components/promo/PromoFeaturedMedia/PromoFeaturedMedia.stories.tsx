// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoFeaturedMedia, { PromoFeaturedMediaProps } from './PromoFeaturedMedia';
import defaultData from './PromoFeaturedMedia.mock-data';
import withBlackBackgroundData from './PromoFeaturedMedia.mock-data-black';
import withGrayBackgroundData from './PromoFeaturedMedia.mock-data-gray';
import withVideoData from './PromoFeaturedMedia.mock-data-video';

export default {
  title: 'Promo/PromoFeaturedMedia',
  component: PromoFeaturedMedia,
} as Meta;

const Template: Story<PromoFeaturedMediaProps> = (props) => <PromoFeaturedMedia {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const WithDarkBackgroundData = Template.bind({});
WithDarkBackgroundData.args = withBlackBackgroundData;

export const WithGrayBackgroundData = Template.bind({});
WithGrayBackgroundData.args = withGrayBackgroundData;

export const Video = Template.bind({});
Video.args = withVideoData;
