// Global
import { Story, Meta } from '@storybook/react';

// Local
import ARButton, { ARButtonProps } from './ARButton';
import defaultData from './ARButton.mock-data';

export default {
  title: 'Helpers/ARButton',
  component: ARButton,
} as Meta;

const Template: Story<ARButtonProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="min-h-10 col-span-6 mt-6 p-3 md:col-span-3 md:col-start-6">
        <ARButton {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
