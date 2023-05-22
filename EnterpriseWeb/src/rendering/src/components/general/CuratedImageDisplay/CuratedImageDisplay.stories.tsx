// Global
import { Story, Meta } from '@storybook/react';
// Local
import CuratedImageDisplay, { CuratedImageDisplayProps } from './CuratedImageDisplay';
import defaultData from './CuratedImageDisplay.mock-data';

export default {
  title: 'General/CuratedImageDisplay',
  component: CuratedImageDisplay,
} as Meta;
const Template: Story<CuratedImageDisplayProps> = (props) => <CuratedImageDisplay {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
