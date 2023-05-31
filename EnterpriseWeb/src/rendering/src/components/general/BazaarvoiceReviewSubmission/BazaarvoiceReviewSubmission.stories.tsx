// Global
import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';

// Local
import BazaarvoiceReviewSubmission, {
  BazaarvoiceReviewSubmissionProps,
} from './BazaarvoiceReviewSubmission';
import defaultData from './BazaarvoiceReviewSubmission.mock-data';

export default {
  title: 'General/BazaarvoiceReviewSubmission',
  component: BazaarvoiceReviewSubmission,
} as Meta;
const Template: Story<BazaarvoiceReviewSubmissionProps> = (props) => (
  <BazaarvoiceReviewSubmission {...props} />
);
export const Default = Template.bind({});
Default.args = defaultData;
Default.parameters = {
  nextRouter: {
    path: '',
    asPath: '/?externalIds=100-CAS,400-CAS',
    query: {},
  },
  msw: {
    handlers: [
      // @ts-ignore - default param req used in definition.
      graphql.query('ProductByBVIdQuery', (req, res, ctx) => {
        return res(
          ctx.data({
            search: {
              total: 2,
              pageInfo: {
                endCursor: 'Mg==',
                hasNext: false,
              },
              results: [
                {
                  bazaarvoiceProductId: {
                    value: '100-CAS',
                  },
                  productName: {
                    value: '100 SERIES CASEMENT WINDOW',
                  },
                  productImage: {
                    src: 'https://place-puppy.com/200x200',
                    height: 200,
                    width: 200,
                    alt: '200x200 puppy',
                  },
                },
                {
                  bazaarvoiceProductId: {
                    value: '400-CAS',
                  },
                  productName: {
                    value: '400 SERIES FRENCHWOOD GLIDING PATIO DOOR',
                  },
                  productImage: {
                    src: 'https://place-puppy.com/100x100',
                    height: 100,
                    width: 100,
                    alt: '100x100 puppy',
                  },
                },
              ],
            },
          })
        );
      }),
    ],
  },
};
