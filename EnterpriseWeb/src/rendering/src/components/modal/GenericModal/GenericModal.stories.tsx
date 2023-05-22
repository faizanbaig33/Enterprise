// Global
import { Story, Meta } from '@storybook/react';
// Local
import GenericModal, { GenericModalProps } from './GenericModal';
import defaultData from './GenericModal.mock-data';

export default {
  title: 'Modal/GenericModal',
  component: GenericModal,
} as Meta;
const Template: Story<GenericModalProps> = (props) => <GenericModal {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
