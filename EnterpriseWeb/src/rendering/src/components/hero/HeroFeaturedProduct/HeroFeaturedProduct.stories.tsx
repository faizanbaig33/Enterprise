// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeroFeaturedProduct, { HeroFeaturedProductProps } from './HeroFeaturedProduct';
import defaultData from './HeroFeaturedProduct.mock-data';

export default {
  title: 'Hero/HeroFeaturedProduct',
  component: HeroFeaturedProduct,
} as Meta;
const Template: Story<HeroFeaturedProductProps> = (props) => <HeroFeaturedProduct {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
