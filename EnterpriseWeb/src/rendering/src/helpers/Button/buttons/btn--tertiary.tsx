import { useTheme } from 'lib/context/ThemeContext';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { ButtonProps } from '../Button';
import { getEnum } from 'lib/utils';
import classNames from 'classnames';

const ButtonTertiary = (props: ButtonProps): JSX.Element => {
  const { themeName } = useTheme();
  const { field, icon, classes, modalId, modalLinkText } = props;
  const _icon = getEnum<IconTypes>(icon);

  if (themeName === 'aw') {
    if (field) {
      return (
        <LinkWrapper
          modalId={modalId}
          modalLinkText={modalLinkText}
          field={field}
          className={classNames(
            'flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-gray px-m py-[9px] font-sans text-button font-heavy hover:bg-gray hover:text-white disabled:border-gray disabled:text-gray',
            classes
          )}
        >
          {icon && <SvgIcon icon={_icon} className="ml-xxs" />}
        </LinkWrapper>
      );
    }
  } else {
    if (field) {
      return (
        <LinkWrapper
          modalId={modalId}
          modalLinkText={modalLinkText}
          field={field}
          className={classNames(
            'group relative flex w-fit items-center font-serif text-button font-bold text-theme-text after:absolute after:bottom-[-4px] after:hidden after:h-[1px] after:w-full after:bg-primary hover:after:inline-block disabled:text-gray',
            classes
          )}
        >
          {icon && (
            <SvgIcon
              icon={_icon}
              className="ml-[10px] text-primary group-hover:text-primary group-hover:underline group-hover:decoration-primary group-hover:underline-offset-8"
            />
          )}
        </LinkWrapper>
      );
    }
  }

  return <></>;
};

export default ButtonTertiary;
