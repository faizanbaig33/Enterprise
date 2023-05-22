import { useTheme } from 'lib/context/ThemeContext';
import { LinkWrapper } from 'src/helpers/LinkWrapper';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { ButtonProps } from '../Button';
import { getEnum } from 'lib/utils';
import classNames from 'classnames';

const ButtonLinkRightIcon = (props: ButtonProps): JSX.Element => {
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
            'space-between relative flex w-full grow items-center py-3 pr-l font-sans text-xs font-heavy leading-6 text-secondary hover:underline hover:decoration-black hover:underline-offset-8',
            classes
          )}
        >
          {icon && (
            <SvgIcon
              icon={_icon}
              className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-primary hover:bg-primary hover:text-white"
            />
          )}
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
            'space-between relative flex w-full grow items-center py-3 pr-l font-serif text-xs font-medium leading-7 text-secondary hover:underline hover:decoration-black hover:underline-offset-8',
            classes
          )}
        >
          {icon && (
            <SvgIcon
              icon={_icon}
              className="absolute right-0 flex h-10 w-10 items-center justify-center bg-black p-2 text-primary hover:bg-primary hover:text-black"
            />
          )}
        </LinkWrapper>
      );
    }
  }

  return <></>;
};

export default ButtonLinkRightIcon;
