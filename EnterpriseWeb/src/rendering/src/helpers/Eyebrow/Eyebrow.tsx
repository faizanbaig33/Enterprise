import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { getHeadingLevel, useExperienceEditor } from 'lib/utils';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';

export type EyebrowProps = Foundation.EnterpriseWeb.Core.FieldSets.Eyebrow & {
  useTag?: string;
  classes: string;
};

const Eyebrow = ({ fields, useTag, classes }: EyebrowProps): JSX.Element => {
  const isEE = useExperienceEditor();
  const defaultTag = 'h2';
  const tag = useTag ?? getHeadingLevel(defaultTag, fields?.eyebrowLevel);

  if (fields?.eyebrowText.value == '' && !isEE) {
    return <></>;
  }

  return (
    <div className={classes}>
      <Text tag={tag} field={fields?.eyebrowText} />
    </div>
  );
};
export default Eyebrow;
