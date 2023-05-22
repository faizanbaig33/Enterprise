import { useTheme } from 'lib/context/ThemeContext';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { ButtonProps } from '../Button';
import { getEnum } from 'lib/utils';
import classNames from 'classnames';

const ButtonLink = (props: ButtonProps): JSX.Element => {
  const { themeName } = useTheme();
  const { field, icon, classes, modalId, modalLinkText } = props;
  const _icon = getEnum<IconTypes>(icon);

  if (themeName === 'aw') {
    if (field) {
      return (
        <LinkWrapper
          field={field}
          className={classNames(
            'flex w-fit items-center whitespace-nowrap font-sans text-text-link font-heavy text-theme-text hover:underline hover:decoration-secondary hover:underline-offset-8 disabled:border-gray disabled:text-gray',
            classes
          )}
          modalId={modalId}
          modalLinkText={modalLinkText}
        >
          {icon && <SvgIcon icon={_icon} className="ml-xxs" />}
        </LinkWrapper>
      );
    }
  } else {
    if (field) {
      let defClass =
        'group relative flex w-fit items-center text-text-link font-bold font-serif text-theme-text hover:underline hover:decoration-primary hover:underline-offset-8 disabled:text-gray';
      if (classes.includes('font-', 0)) {
        defClass = defClass.replace('font-bold', '');
      }
      return (
        <LinkWrapper
          field={field}
          className={classNames(defClass, classes)}
          modalId={modalId}
          modalLinkText={modalLinkText}
        >
          {icon && (
            <SvgIcon
              icon={_icon}
              className="ml-[10px] text-theme-btn-bg-hover hover:underline hover:decoration-primary hover:underline-offset-8"
            />
          )}
        </LinkWrapper>
      );
    }
  }

  return <></>;
};

export default ButtonLink;
