// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoMediaBackground, { PromoMediaBackgroundProps } from './PromoMediaBackground';
import defaultData from './PromoMediaBackground.mock-data';
import overlayData from './PromoMediaBackground.mock-data-overlay';

export default {
  title: 'Promo/PromoMediaBackground',
  component: PromoMediaBackground,
} as Meta;
const Template: Story<PromoMediaBackgroundProps> = (props) => <PromoMediaBackground {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
export const Overlay = Template.bind({});
Overlay.args = overlayData;
