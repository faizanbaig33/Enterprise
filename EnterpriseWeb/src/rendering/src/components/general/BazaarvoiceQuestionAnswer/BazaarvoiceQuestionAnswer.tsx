// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { Component } from 'src/helpers/Component';
import { Headline } from 'src/helpers/Headline';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { BazaarvoiceQuestionAnswerTheme } from './BazaarvoiceQuestionAnswer.theme';

export type BazaarvoiceQuestionAnswerProps =
  Feature.EnterpriseWeb.Components.General.BazaarvoiceQuestionAnswer.BazaarvoiceQuestionAnswer;
const BazaarvoiceQuestionAnswer = (props: BazaarvoiceQuestionAnswerProps) => {
  const { themeData } = useTheme(BazaarvoiceQuestionAnswerTheme);
  const productItem = props?.fields?.productItem;
  const bazaarvoiceProductId = productItem?.fields?.bazaarvoiceProductId?.value;
  const componentId = 'bazaarvoice-question-answer-' + bazaarvoiceProductId; // Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
  const [isOpen, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [questionCount, setCount] = useState('');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const onPageLoad = () => {
      const bvSelector = document.querySelector<HTMLElement>(
        '#BVQAContainer .bv-control-bar .bv-content-pagination-pages-current span'
      );
      const bvSpanInnerText = bvSelector?.innerText || '';

      //Get the last number from "1-10 of XX Questions" span tag
      const regex = new RegExp(/(\d+)(?!.*\d)/gm);
      const allMatched = Array.from(bvSpanInnerText?.matchAll(regex));
      const firstMatch = allMatched[0];

      if (firstMatch != undefined) {
        setCount(firstMatch[0]);
      } else {
        setCount('0');
      }
    };

    window.addEventListener('load', onPageLoad);
    return () => {
      window.removeEventListener('load', onPageLoad);
    };
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Component gap="0" variant="lg" dataComponent="general/bazaarvoicequestionanswer" {...props}>
      <Headline classes={themeData.classes.headline} {...props} />
      <div className={themeData.classes.wrapperClass}>
        <a
          className={themeData.classes.accordionToggleContainer}
          data-anchor-name={'#' + componentId}
        >
          <h3 className={themeData.classes.accordionHeadline} onClick={() => setOpen(!isOpen)}>
            <div className={themeData.classes.readQuestion}>Read Questions</div>
            <div className={themeData.classes.questionCount}>({questionCount})</div>
            <div className={themeData.classes.accordionToggleIndicator}>
              <SvgIcon icon={isOpen ? 'minus' : 'plus'} className={themeData.classes.iconClass} />
            </div>
          </h3>
        </a>
        <div
          className={`content-container ${
            isOpen ? themeData.classes.contentOpen : themeData.classes.contentClosed
          }`}
          id={componentId}
        >
          <div className="content">
            <div data-bv-show="questions" data-bv-product-id={bazaarvoiceProductId}></div>
          </div>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<BazaarvoiceQuestionAnswerProps>(BazaarvoiceQuestionAnswer);
