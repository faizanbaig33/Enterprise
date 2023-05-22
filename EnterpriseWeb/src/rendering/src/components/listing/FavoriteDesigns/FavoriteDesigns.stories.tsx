// Global
import { Story, Meta } from '@storybook/react';
// Local
import FavoriteDesigns, { FavoriteDesignsProps } from './FavoriteDesigns';
import defaultData from './FavoriteDesigns.mock-data';

export default {
  title: 'Listing/FavoriteDesigns',
  component: FavoriteDesigns,
} as Meta;
const Template: Story<FavoriteDesignsProps> = (props) => <FavoriteDesigns {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
