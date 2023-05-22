// Global
import { Story, Meta } from '@storybook/react';

// Local
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';
import defaultData from './ButtonGroup.mock-data';

export default {
  title: 'Helpers/ButtonGroup',
  component: ButtonGroup,
} as Meta;

const Template: Story<ButtonGroupProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="min-h-10 col-span-6 mt-6 p-3 md:col-span-3 md:col-start-6">
        <ButtonGroup {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;
