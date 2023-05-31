// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ThemeFile, useTheme } from 'lib/context/ThemeContext';
import { useBVScript } from 'lib/utils/use-bv-script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { Component } from 'src/helpers/Component';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import { BazaarvoiceReviewSubmissionTheme } from './BazaarvoiceReviewSubmission.theme';

import { getHeadingLevel } from 'lib/utils';
import { Headline } from 'src/helpers/Headline';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import {
  BazaarvoiceReviewSubmissionQueryResult,
  GraphQLBVProductIdService,
} from './BazaarvoiceProductsByBVId.graphql';

export type BazaarvoiceReviewSubmissionProps =
  Feature.EnterpriseWeb.Components.General.BazaarvoiceReviewSubmission.BazaarvoiceReviewSubmission;

const RenderReviewButton = (
  props: BazaarvoiceReviewSubmissionQueryResult,
  themeData: ThemeFile | any
) => {
  if (props === null) return <></>;

  const imageField = {
    value: props?.productImage,
  };

  return (
    <>
      <div className={themeData.classes.bazaarvoiceImageWrapper}>
        <ImageWrapper image={imageField}></ImageWrapper>
      </div>
      <div className={themeData.classes.bazaarvoiceProductContent}>
        <h3 className={themeData.classes.bazaarvoiceProductHeadline}>{props.productName?.value}</h3>
        <button
          onClick={() => SubmitReviewClick(props.bazaarvoiceProductId?.value)}
          className={themeData.classes.buttonClass}
          title="Start Rating"
        >
          Start Rating
        </button>
      </div>
    </>
  );
};

const SubmitReviewClick = (externalId: string) => {
  // @ts-ignore $BV will be available after the page loads.
  $BV.ui('rr', 'submit_review', { productId: externalId });
};

const RenderAllReviewButtons = (
  props: BazaarvoiceReviewSubmissionQueryResult[],
  themeData: ThemeFile | any
) => {
  if (props === null || props?.length === 0) return <></>;

  return (
    <div className={themeData.classes.bazaarvoiceContainerWrapper}>
      {props.map((_item, _index) => (
        <div key={_index} className={themeData.classes.bazaarvoiceProductWrapper}>
          {RenderReviewButton(_item, themeData)}
        </div>
      ))}
    </div>
  );
};

const BazaarvoiceReviewSubmission = (props: BazaarvoiceReviewSubmissionProps) => {
  const { themeData } = useTheme(BazaarvoiceReviewSubmissionTheme);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<BazaarvoiceReviewSubmissionQueryResult[]>([]);
  const graphQLBVProductIdService = new GraphQLBVProductIdService();

  // Add the bazaarvoice script
  useBVScript();

  useEffect(() => {
    async function getProductsByBVProductId() {
      const urlSearchParams = new URLSearchParams(router.asPath.split('?')[1]);
      const productIds = urlSearchParams.get('externalIds');
      const sourceIds = props?.fields?.bazaarvoiceProducts?.map((product: any) => product.id);

      if (sourceIds?.length > 0 && productIds) {
        const req = await graphQLBVProductIdService.getProductsByBVProductId(
          sourceIds,
          productIds.split(',')
        );
        setSearchResults(req);
      }
    }
    getProductsByBVProductId();
  }, [router.asPath, router.isReady]);

  return (
    <Component variant="lg" dataComponent="general/bazaarvoicereviewsubmission" {...props}>
      <div className={themeData.classes.componentWrapperClass}>
        <Headline
          useTag={getHeadingLevel('h2', props.fields?.headlineLevel)}
          classes={themeData.classes.headlineContainer}
          {...props}
        />
        <RichTextWrapper
          field={props?.fields?.thankYouMessaging}
          classes={themeData.classes.thankYouMessaging}
        />
        {RenderAllReviewButtons(searchResults, themeData)}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<BazaarvoiceReviewSubmissionProps>(BazaarvoiceReviewSubmission);
