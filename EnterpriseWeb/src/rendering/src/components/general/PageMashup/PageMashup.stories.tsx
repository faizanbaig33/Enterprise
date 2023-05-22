// Global
import { Story, Meta } from '@storybook/react';
// Local
import PageMashup, { PageMashupProps } from './PageMashup';
import imagesForAllData from './PageMashup.mock-data-images-for-all';
import noImagesData from './PageMashup.mock-data-no-images';
import featuredImageOnlyData from './PageMashup.mock-data-featured-image';

export default {
  title: 'General/PageMashup',
  component: PageMashup,
} as Meta;
const Template: Story<PageMashupProps> = (props) => <PageMashup {...props} />;

export const ImagesForAll = Template.bind({});
ImagesForAll.args = imagesForAllData;

export const featuredImageOnly = Template.bind({});
featuredImageOnly.args = featuredImageOnlyData;

export const noImages = Template.bind({});
noImages.args = noImagesData;
