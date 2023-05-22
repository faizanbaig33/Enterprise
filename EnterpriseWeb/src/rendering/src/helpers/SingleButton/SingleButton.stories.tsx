// Global
import { Story, Meta } from '@storybook/react';
// Local
import SingleButton, { SingleButtonProps } from './SingleButton';
import defaultData from './SingleButton.mock-data';

export default {
  title: 'Helpers/SingleButton',
  component: SingleButton,
} as Meta;
const Template: Story<SingleButtonProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="min-h-10 col-span-6 mt-6 md:col-span-3 md:col-start-6">
        <SingleButton {...props} />
      </div>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = defaultData;
