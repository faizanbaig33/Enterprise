import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import { RichTextWrapper } from '../RichTextWrapper';
import { useExperienceEditor } from 'lib/utils';
import classNames from 'classnames';

export type BodyCopyProps = Foundation.EnterpriseWeb.Core.FieldSets.BodyCopy & {
  classes: string;
};

const BodyCopy = ({ fields, classes }: BodyCopyProps): JSX.Element => {
  const isEE = useExperienceEditor();

  if (fields?.body?.value == '' && !isEE) {
    return <></>;
  }

  if (!classes) {
    classes = classNames(classes, 'text-theme-body text-body mb-s');
  }
  return (
    <div className={classes}>
      <RichTextWrapper field={fields?.body} />
    </div>
  );
};
export default BodyCopy;
