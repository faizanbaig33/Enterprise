// Global
import { Story, Meta } from '@storybook/react';

// Local
import Subheadline, { SubheadlineProps } from './Subheadline';
import defaultData from './Subheadline.mock-data';

export default {
  title: 'Helpers/Subheadline',
  component: Subheadline,
} as Meta;

const Template: Story<SubheadlineProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="col-span-12 md:col-span-12">
        <Subheadline {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
