// Global
import { Story, Meta } from '@storybook/react';
// Local
import BazaarvoiceQuestionAnswer, {
  BazaarvoiceQuestionAnswerProps,
} from './BazaarvoiceQuestionAnswer';
import defaultData from './BazaarvoiceQuestionAnswer.mock-data';
import noHeaderDefaultData from './BazaarvoiceQuestionAnswer.mock-data-no-headline';

export default {
  title: 'General/BazaarvoiceQuestionAnswer',
  component: BazaarvoiceQuestionAnswer,
} as Meta;
const Template: Story<BazaarvoiceQuestionAnswerProps> = (props) => (
  <>
    <script
      async
      src="https://apps.bazaarvoice.com/deployments/andersenwindows/main_site/staging/en_US/bv.js"
    ></script>
    <BazaarvoiceQuestionAnswer {...props} />
  </>
);

export const Default = Template.bind({});
Default.args = defaultData;

export const NoHeaderDefault = Template.bind({});
NoHeaderDefault.args = noHeaderDefaultData;
