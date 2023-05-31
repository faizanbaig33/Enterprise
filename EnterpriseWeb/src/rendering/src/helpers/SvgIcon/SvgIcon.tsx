// Global
import dynamic from 'next/dynamic';
//  Icon contents should be stored in the icons subdirectory using the naming scheme 'icon--[name].tsx'

export type IconTypes =
  | undefined
  | 'close'
  | 'hamburger'
  | 'minus'
  | 'new-tab'
  | 'new-tab-black'
  | 'plus'
  | 'arrow'
  | 'arrow-left'
  | 'arrow-right'
  | 'external-link'
  | 'download'
  | 'smallclose'
  | 'smallplus'
  | 'star'
  | 'orange-triangle'
  | 'quote'
  | 'caret'
  | 'facebook'
  | 'instagram'
  | 'pinterest'
  | 'twitter'
  | 'youtube'
  | 'houzz'
  | 'linkedin'
  | 'search'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-right-sm'
  | 'chevron-left-sm'
  | 'play'
  | 'pause'
  | 'location-pin'
  | 'favorite'
  | 'pdf'
  | 'pdf-aw'
  | 'zoom-pinch'
  | 'caret-right'
  | 'print'
  | 'reset'
  | 'share';

export interface SvgIconProps {
  className?: string;
  icon: IconTypes;
  defs?: JSX.Element;
  fillId?: string;
  size?: Sizes;
}

export interface IconProps {
  fillId?: string;
  size?: string;
}

export type Sizes = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const IconSize: Record<Sizes, string> = {
  sm: '8',
  md: '12',
  lg: '16',
  xl: '20',
  xxl: '24',
};

const SvgIcon = ({ icon, className, defs, fillId, size = 'md' }: SvgIconProps): JSX.Element => {
  if (!icon) {
    return <></>;
  }

  const IconContent = dynamic(() => import(`./icons/icon--${icon}`));

  const props: IconProps = {
    fillId: fillId,
    size: IconSize[size],
  };

  return (
    <span className={className}>
      <IconContent {...props}>{!!defs && defs}</IconContent>
    </span>
  );
};

export default SvgIcon;
