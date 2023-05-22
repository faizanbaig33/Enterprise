// Global
import { Story, Meta } from '@storybook/react';
// Local
import BazaarvoiceReviews, { BazaarvoiceReviewsProps } from './BazaarvoiceReviews';
import defaultData from './BazaarvoiceReviews.mock-data';

export default {
  title: 'General/BazaarvoiceReviews',
  component: BazaarvoiceReviews,
} as Meta;
const Template: Story<BazaarvoiceReviewsProps> = (props) => (
  <>
    <script
      async
      src="https://apps.bazaarvoice.com/deployments/andersenwindows/main_site/staging/en_US/bv.js"
    ></script>
    <BazaarvoiceReviews {...props} />
  </>
);

export const Default = Template.bind({});
Default.args = defaultData;
