import { LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { getHeadingLevel, useExperienceEditor } from 'lib/utils';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import { LinkWrapper } from '../LinkWrapper';
import classNames from 'classnames';

export type HeadlineProps = Foundation.EnterpriseWeb.Core.FieldSets.Headline & {
  useTag?: string;
  classes: string;
};

const Headline = ({ fields, useTag, classes }: HeadlineProps): JSX.Element => {
  const isEE = useExperienceEditor();
  const defaultTag = 'h2';
  const tag = useTag ?? getHeadingLevel(defaultTag, fields?.headlineLevel);

  if (fields?.headlineText?.value == '' && !isEE) {
    return <></>;
  }

  if (!classes) {
    classes = classNames(classes, 'text-theme-text text-sm-m md:text-m font-bold mb-s');
  }

  const superCss = fields?.superscriptCTA?.value?.href ? 'flex flex-nowrap' : '';
  const getSuperscript = (field: LinkField | undefined) => {
    if (field != undefined) {
      const asField = !field?.value ? { value: { ...field } } : (field as LinkField);
      if (asField.value.src != '') {
        return (
          <sup className={`basis-0 text-small font-light hover:underline`}>
            <LinkWrapper field={asField} />
          </sup>
        );
      }
    }

    return <></>;
  };

  return (
    <div className={classNames(`items-top font-sans ${superCss}`, classes)}>
      <Text tag={tag} encode={true} field={fields?.headlineText} />
      {fields?.superscriptCTA?.value?.href && getSuperscript(fields?.superscriptCTA)}
    </div>
  );
};
export default Headline;
