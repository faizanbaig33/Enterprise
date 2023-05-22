// Global
import { Story, Meta } from '@storybook/react';

// Local
import StarRating, { StarRatingProps } from './StarRating';
import defaultData from './StarRating.mock-data';

export default {
  title: 'Helpers/StarRating',
  component: StarRating,
} as Meta;

const Template: Story<StarRatingProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="min-h-10 col-span-12 md:col-span-6 md:col-start-3">
        <StarRating {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
