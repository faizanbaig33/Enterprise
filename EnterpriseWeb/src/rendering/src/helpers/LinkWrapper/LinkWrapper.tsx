// Global
import type { LinkProps } from '@sitecore-jss/sitecore-jss-react';
import { Link, LinkField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
// Lib
import useExperienceEditor from 'lib/utils/use-experience-editor';
import { useModalIdContext } from 'lib/context/GenericModalIDContext';
import { Children, MouseEvent } from 'react';

/**
 * This component adds some needed accessibility
 * updates to the JSS Link component
 */

export interface LinkWrapperProps extends LinkProps {
  srOnlyText?: string;
  suppressLinkText?: boolean;
  suppressNewTabIcon?: boolean;
  modalId?: string | undefined;
  modalLinkText?: Field<string>;
}

const INTERNAL_LINK_REGEX = /^\//g;

const LinkWrapper = ({
  children,
  field,
  srOnlyText,
  suppressLinkText,
  modalId,
  modalLinkText,
  ...props
}: LinkWrapperProps): JSX.Element => {
  // Format field as LinkField for consistency
  const asLinkField = !field?.value ? { value: { ...field } } : (field as LinkField);
  // Sitecore doesn't do tel: links correctly, it appends http to it.  Remove that.
  asLinkField.value.href = asLinkField.value.href?.replace('http://tel:', 'tel:');

  const text = suppressLinkText ? '' : asLinkField?.value?.text;
  const target = asLinkField?.value?.target;
  const { setSelectedModalId, prevFocusedElementRef } = useModalIdContext();

  const handleModalClick = (e: MouseEvent) => {
    if (modalId) {
      setSelectedModalId(modalId);
      prevFocusedElementRef &&
        (prevFocusedElementRef.current = e.currentTarget as HTMLButtonElement);
    }
  };

  const isEE = useExperienceEditor();

  // if modalId is provided, then act as ModalCta
  if (modalId) {
    return (
      <button onClick={(e) => handleModalClick(e)} className={props.className}>
        {modalLinkText?.value} {children}
      </button>
    );
  }

  // In experience editor, do not pass any children but retain basic styling
  // so that double components do not appear when using <Link>
  if (isEE) {
    const ctaIcon = Children.toArray(children)?.[0];
    const ctaEEClassess = props.className;
    delete props.className;
    return (
      <div className={ctaEEClassess}>
        <Link
          field={asLinkField}
          {...props}
          showLinkTextWithChildrenPresent={false}
          internalLinkMatcher={INTERNAL_LINK_REGEX}
        />
        {ctaIcon && ctaIcon}
      </div>
    );
  }

  // If no content is present, don't print
  if (!suppressLinkText && !asLinkField.value.text && !asLinkField.value.href) {
    return <></>;
  }

  return (
    <Link
      field={asLinkField}
      {...props}
      showLinkTextWithChildrenPresent={false}
      internalLinkMatcher={INTERNAL_LINK_REGEX}
      tabIndex={0}
      role="link"
    >
      {text}
      {children}
      {(target === '_blank' || srOnlyText) && (
        <>
          <span className="sr-only">
            {srOnlyText && srOnlyText}
            {/* Preserve a single space character before SR Tab Text */}
            {target === '_blank' && ' (Opens in a new tab)'}
          </span>
          {/* {!suppressNewTabIcon && target === '_blank' && (
            <SvgIcon icon="new-tab" size="em" className="ml-2" />
          )} */}
        </>
      )}
    </Link>
  );
};

export default LinkWrapper;
