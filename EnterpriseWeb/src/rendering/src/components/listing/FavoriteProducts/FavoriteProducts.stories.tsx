// Global
import { Story, Meta } from '@storybook/react';
// Local
import FavoriteProducts, { FavoriteProductsProps } from './FavoriteProducts';
import defaultData from './FavoriteProducts.mock-data';

export default {
  title: 'Listing/FavoriteProducts',
  component: FavoriteProducts,
} as Meta;
const Template: Story<FavoriteProductsProps> = (props) => <FavoriteProducts {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
