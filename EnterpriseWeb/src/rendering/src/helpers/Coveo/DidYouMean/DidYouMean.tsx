import { DidYouMean as HeadlessDidYouMean } from '@coveo/headless';
import { useEffect, useState, FunctionComponent } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

interface DidYouMeanProps {
  controller: HeadlessDidYouMean;
  didYouMeanProps: Feature.EnterpriseWeb.Elements.Search.DidYouMean;
  didYouMeanClasses?: {
    [key: string]: string;
  };
}

export const DidYouMean: FunctionComponent<DidYouMeanProps> = (props) => {
  const { controller, didYouMeanClasses, didYouMeanProps } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  if (!state.hasQueryCorrection) {
    return null;
  }

  if (state.wasAutomaticallyCorrected) {
    return (
      <div className="p-s">
        <div className={didYouMeanClasses?.wasAutomaticallyCorrected}>
          {didYouMeanProps.fields?.noResultsText.value} <span>{state.originalQuery}</span>
        </div>
        <div className={didYouMeanClasses?.wasAutomaticallyCorrected}>
          {didYouMeanProps.fields?.autoCorrectionText.value} <span>{state.wasCorrectedTo}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={didYouMeanClasses?.didYouMeanLabel}>
      <span>{didYouMeanProps.fields?.didYouMeanText.value} </span>

      <button
        onClick={() => controller.applyCorrection()}
        className={didYouMeanClasses?.correctedQuery}
      >
        {state.queryCorrection.correctedQuery}
      </button>
    </div>
  );
};
