// Global
import { Story, Meta } from '@storybook/react';

// Local
import GenericCard, { GenericCardProps } from './GenericCard';
import withNoMediaData from './GenericCard.mock-data';
import withImageData from './GenericCard.mock-data-image';
import withVideoData from './GenericCard.mock-data-video';
import withIconData from './GenericCard.mock-data-icon';
import classNames from 'classnames';
import { Component } from 'src/helpers/Component';

export default {
  title: 'Card/Generic Card',
  component: GenericCard,
} as Meta;

const Template: Story<GenericCardProps> = (props) => {
  return (
    <Component variant="lg" dataComponent="listing/xupcardcollection" {...props}>
      <div className={classNames('col-span-4')}>
        <GenericCard {...props} />
      </div>
      <div className={classNames('col-span-4')}>
        <GenericCard {...props} />
      </div>
      <div className={classNames('col-span-4')}>
        <GenericCard {...props} />
      </div>
    </Component>
  );
};

export const WithNoMedia = Template.bind({});
WithNoMedia.args = withNoMediaData;

export const WithImage = Template.bind({});
WithImage.args = withImageData;

export const WithVideo = Template.bind({});
WithVideo.args = withVideoData;

export const WithIcon = Template.bind({});
WithIcon.args = withIconData;
