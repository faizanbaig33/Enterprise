// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoSwatches, { PromoSwatchesProps } from './PromoSwatches';
import defaultData from './PromoSwatches.mock-data.full-width';
import sideBySide from './PromoSwatches.mock-data.side-by-side';

export default {
  title: 'Promo/PromoSwatches',
  component: PromoSwatches,
} as Meta;
const Template: Story<PromoSwatchesProps> = (props) => <PromoSwatches {...props} />;
export const FullWidth = Template.bind({});
FullWidth.args = defaultData;

export const SideBySide = Template.bind({});
SideBySide.args = sideBySide;
