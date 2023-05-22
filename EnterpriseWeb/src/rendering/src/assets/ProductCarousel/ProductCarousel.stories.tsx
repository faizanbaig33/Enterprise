// Global
import { Story, Meta } from '@storybook/react';
// Local
import ProductCarousel, { ProductCarouselProps } from './ProductCarousel';
import defaultData from './ProductCarousel.mock-data';

export default {
  title: 'General/ProductCarousel',
  component: ProductCarousel,
} as Meta;
const Template: Story<ProductCarouselProps> = (props) => <ProductCarousel {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
