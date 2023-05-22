// Global
import { Story, Meta } from '@storybook/react';

// Local
import BodyCopy, { BodyCopyProps } from './BodyCopy';
import defaultData from './BodyCopy.mock-data';

export default {
  title: 'Helpers/BodyCopy',
  component: BodyCopy,
} as Meta;

const Template: Story<BodyCopyProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="col-span-12 p-3 md:col-span-12">
        <BodyCopy {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
