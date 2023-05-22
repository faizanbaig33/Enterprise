// Global
import { Story, Meta } from '@storybook/react';

// Local
import Caption, { CaptionProps } from './Caption';
import defaultData from './Caption.mock-data';

export default {
  title: 'Helpers/BodyCopy',
  component: Caption,
} as Meta;

const Template: Story<CaptionProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="col-span-12 p-3 md:col-span-12">
        <Caption {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
