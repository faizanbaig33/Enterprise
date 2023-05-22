// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoGeneric, { PromoGenericProps } from './PromoGeneric';
import { leftImage, rightImage } from './PromoGeneric.mock-data';

export default {
  title: 'Promo/Promo Generic',
  component: PromoGeneric,
  argTypes: {},
} as Meta;

const Template: Story<PromoGenericProps> = (props) => <PromoGeneric {...props} />;
export const LeftImage = Template.bind({});
LeftImage.args = leftImage;

export const RightImage = Template.bind({});
RightImage.args = rightImage;
