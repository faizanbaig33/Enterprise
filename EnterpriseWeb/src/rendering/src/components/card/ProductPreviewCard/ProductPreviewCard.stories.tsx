// Global
import { Story, Meta } from '@storybook/react';
// Local
import ProductPreviewCard, { ProductPreviewCardProps } from './ProductPreviewCard';
import defaultData from './ProductPreviewCard.mock-data';
import classNames from 'classnames';
import { Component } from 'src/helpers/Component';

export default {
  title: 'Card/ProductPreviewCard',
  component: ProductPreviewCard,
} as Meta;
const Template: Story<ProductPreviewCardProps> = (props) => {
  return (
    <Component variant="lg" dataComponent="listing/xupcardcollection" {...props}>
      <div className={classNames('col-span-4')}>
        <ProductPreviewCard {...props} />
      </div>
      <div className={classNames('col-span-4')}>
        <ProductPreviewCard {...props} />
      </div>
      <div className={classNames('col-span-4')}>
        <ProductPreviewCard {...props} />
      </div>
    </Component>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
