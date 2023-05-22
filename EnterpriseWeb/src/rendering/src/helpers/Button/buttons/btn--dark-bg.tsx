import { useTheme } from 'lib/context/ThemeContext';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { ButtonProps } from '../Button';
import { getEnum } from 'lib/utils';
import classNames from 'classnames';

const ButtonDarkBG = (props: ButtonProps): JSX.Element => {
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
            'flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-white bg-white px-m py-[9px] font-sans text-button font-heavy text-black hover:border-black hover:bg-black hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
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
            'group relative flex w-fit items-center bg-theme-btn-bg p-s font-serif text-button font-bold text-theme-btn-text hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
            classes
          )}
        >
          {icon && (
            <SvgIcon icon={_icon} className="ml-[10px] text-primary group-hover:text-secondary" />
          )}
        </LinkWrapper>
      );
    }
  }

  return <></>;
};

export default ButtonDarkBG;
