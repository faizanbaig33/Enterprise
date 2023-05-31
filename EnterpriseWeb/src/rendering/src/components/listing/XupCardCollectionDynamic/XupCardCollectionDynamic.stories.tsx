// Global
import { Story, Meta } from '@storybook/react';
// Local
import XupCardCollectionDynamic, {
  XupCardCollectionDynamicProps,
} from './XupCardCollectionDynamic';
import defaultData from './XupCardCollectionDynamic.mock-data';
import withImageData from './XupCardCollectionDynamic.mock-data-with-image';
import noImageData from './XupCardCollectionDynamic.mock-data-no-image';

export default {
  title: 'Listing/XupCardCollectionDynamic',
  component: XupCardCollectionDynamic,
} as Meta;
const Template: Story<XupCardCollectionDynamicProps> = (props) => (
  <XupCardCollectionDynamic {...props} />
);
export const PhotoGallery = Template.bind({});
PhotoGallery.args = defaultData;

export const WithImage = Template.bind({});
WithImage.args = withImageData;

export const NoImage = Template.bind({});
NoImage.args = noImageData;
