// Global
import { Story, Meta } from '@storybook/react';
import Eyebrow, { EyebrowProps } from './Eyebrow';

// Local
import defaultData from './Eyebrow.mock-data';

export default {
  title: 'Helpers/Eyebrow',
  component: Eyebrow,
} as Meta;

const Template: Story<EyebrowProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="col-span-12 p-3 md:col-span-12">
        <Eyebrow {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
