import { useTheme } from 'lib/context/ThemeContext';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { ButtonProps } from '../Button';
import { getEnum } from 'lib/utils';
import classNames from 'classnames';

const ButtonSecondary = (props: ButtonProps): JSX.Element => {
  const { themeName } = useTheme();
  const { field, icon, classes, modalId, modalLinkText } = props;
  const _icon = getEnum<IconTypes>(icon);

  if (themeName === 'aw') {
    if (field) {
      return (
        <LinkWrapper
          field={field}
          className={classNames(
            'flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-black px-m py-[9px] font-sans text-button font-heavy hover:bg-black hover:text-white disabled:border-gray disabled:text-gray',
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
      return (
        <LinkWrapper
          field={field}
          className={classNames(
            'group relative flex w-fit items-center border-2 border-secondary bg-white p-[14px] font-serif text-button font-bold text-theme-text hover:bg-secondary hover:text-white disabled:border-gray disabled:text-gray',
            classes
          )}
          modalId={modalId}
          modalLinkText={modalLinkText}
        >
          {icon && (
            <SvgIcon icon={_icon} className="ml-[10px] text-primary group-hover:text-primary" />
          )}
        </LinkWrapper>
      );
    }
  }

  return <></>;
};

export default ButtonSecondary;
