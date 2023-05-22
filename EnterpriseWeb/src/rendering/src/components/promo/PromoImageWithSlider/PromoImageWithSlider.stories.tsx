// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoImageWithSlider, { PromoImageWithSliderProps } from './PromoImageWithSlider';
import defaultData from './PromoImageWithSlider.full-width.mock-data';
import sideBySideData from './PromoImageWithSlider.side-by-side.mock-data';

export default {
  title: 'Promo/PromoImageWithSlider',
  component: PromoImageWithSlider,
} as Meta;
const Template: Story<PromoImageWithSliderProps> = (props) => <PromoImageWithSlider {...props} />;
export const FullWidth = Template.bind({});
FullWidth.args = defaultData;

export const SideBySide = Template.bind({});
SideBySide.args = sideBySideData;
