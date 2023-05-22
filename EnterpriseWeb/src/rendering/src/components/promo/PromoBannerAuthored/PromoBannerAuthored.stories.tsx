// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoBannerAuthored, { PromoBannerAuthoredProps } from './PromoBannerAuthored';
import defaultData from './PromoBannerAuthored.mock-data';
import withImageData from './PromoBannerAuthored.mock-data-with-image';
import rightAlignData from './PromoBannerAuthored.mock-data-right-align';
import withImageRightAlignData from './PromoBannerAuthored.mock-data-with-image-right-align';
import brandColorOutline from './PromoBannerAuthored.mock-data-brand-color-outline';
import blackSolid from './PromoBannerAuthored.mock-data-black-solid';
import blackOutline from './PromoBannerAuthored.mock-data-black-outline';

export default {
  title: 'Promo/PromoBannerAuthored',
  component: PromoBannerAuthored,
} as Meta;
const Template: Story<PromoBannerAuthoredProps> = (props) => <PromoBannerAuthored {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;

export const WithImage = Template.bind({});
WithImage.args = withImageData;

export const RightAlign = Template.bind({});
RightAlign.args = rightAlignData;

export const WithImageRightAlign = Template.bind({});
WithImageRightAlign.args = withImageRightAlignData;

export const BrandColorOutline = Template.bind({});
BrandColorOutline.args = brandColorOutline;

export const BlackSolid = Template.bind({});
BlackSolid.args = blackSolid;

export const BlackOutline = Template.bind({});
BlackOutline.args = blackOutline;
