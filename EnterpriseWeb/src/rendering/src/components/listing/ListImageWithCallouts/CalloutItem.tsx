import React from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Headline } from 'src/helpers/Headline';

type CalloutItemProps =
  Feature.EnterpriseWeb.Components.Listing.ListImageWithCallouts.ListImageWithCalloutsItem & {
    callOutItemClasses: {
      calloutContainer?: string;
      calloutItemHeadline?: string;
      calloutBody?: string;
    };
  };

const CalloutItem = ({ fields, callOutItemClasses }: CalloutItemProps) => {
  return (
    <div className={callOutItemClasses?.calloutContainer}>
      <Headline classes={callOutItemClasses?.calloutItemHeadline || ''} fields={fields} />
      <BodyCopy classes={callOutItemClasses?.calloutBody || ''} fields={fields} />
    </div>
  );
};

export default CalloutItem;
