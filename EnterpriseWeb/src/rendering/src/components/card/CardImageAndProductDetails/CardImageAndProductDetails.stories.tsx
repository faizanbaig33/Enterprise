// Global
import { Story, Meta } from '@storybook/react';

// Local
import CardImageAndProductDetails, {
  CardImageAndProductDetailsProps,
} from './CardImageAndProductDetails';
import defaultData from './CardImageAndProductDetails.mock-data';
import { Component } from 'src/helpers/Component';
import classNames from 'classnames';

export default {
  title: 'Card/CardImageAndProductDetails',
  component: CardImageAndProductDetails,
} as Meta;

const Template: Story<CardImageAndProductDetailsProps> = (props) => {
  return (
    <Component variant="lg" dataComponent="listing/xupcardcollection" {...props}>
      <div className={classNames('col-span-4')}>
        <CardImageAndProductDetails {...props} />
      </div>
      <div className={classNames('col-span-4')}>
        <CardImageAndProductDetails {...props} />
      </div>
      <div className={classNames('col-span-4')}>
        <CardImageAndProductDetails {...props} />
      </div>
    </Component>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
