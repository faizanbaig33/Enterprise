import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { getHeadingLevel, useExperienceEditor } from 'lib/utils';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';

export type SubheadlineProps = Foundation.EnterpriseWeb.Core.FieldSets.Subheadline & {
  useTag?: string;
  classes: string;
};

const Subheadline = ({ fields, useTag, classes }: SubheadlineProps): JSX.Element => {
  const isEE = useExperienceEditor();
  const defaultTag = 'h3';
  const tag = useTag ?? getHeadingLevel(defaultTag, fields?.subheadlineLevel);

  if (fields?.subheadlineText?.value == '' && !isEE) {
    return <></>;
  }

  return (
    <div className={classNames('font-sans', classes)}>
      <Text tag={tag} field={fields?.subheadlineText} />
    </div>
  );
};
export default Subheadline;
