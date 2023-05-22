// Global
import { Story, Meta } from '@storybook/react';

// Local
import Button, { ButtonProps } from './Button';
import {
  primaryData,
  secondaryData,
  tertiaryData,
  linkData,
  linkiconData,
} from './Button.mock-data';

export default {
  title: 'Helpers/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="min-h-10 col-span-6 mt-6 p-3 md:col-span-3 md:col-start-6">
        <Button {...props} />
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = primaryData;

export const Secondary = Template.bind({});
Secondary.args = secondaryData;

export const Tertiary = Template.bind({});
Tertiary.args = tertiaryData;

export const Link = Template.bind({});
Link.args = linkData;

export const LinkIcon = Template.bind({});
LinkIcon.args = linkiconData;
