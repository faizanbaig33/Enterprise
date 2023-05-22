// Global
import { Story, Meta } from '@storybook/react';

// Local
import Headline, { HeadlineProps } from './Headline';
import defaultData from './Headline.mock-data';

export default {
  title: 'Helpers/Headline',
  component: Headline,
} as Meta;

const Template: Story<HeadlineProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="col-span-12 md:col-span-12">
        <Headline {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
