// Global
import { Story, Meta } from '@storybook/react';
// Local
import ContentBlockWithMedia, { ContentBlockWithMediaProps } from './ContentBlockWithMedia';
import defaultData from './ContentBlockWithMedia.mock-data';
import withTwoImages from './ContentBlockWithMedia.mock-data-two-images';

export default {
  title: 'General/ContentBlockWithMedia',
  component: ContentBlockWithMedia,
} as Meta;
const Template: Story<ContentBlockWithMediaProps> = (props) => <ContentBlockWithMedia {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;

export const twoImages = Template.bind({});
twoImages.args = withTwoImages;
