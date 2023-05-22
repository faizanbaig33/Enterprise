// Global
import { Story, Meta } from '@storybook/react';
// Local
import ProductIntro, { ProductIntroProps } from './ProductIntro';
import defaultData from './ProductIntro.mock-data';

export default {
  title: 'General/ProductIntro',
  component: ProductIntro,
} as Meta;
const Template: Story<ProductIntroProps> = (props) => <ProductIntro {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
