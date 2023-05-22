// Lib
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

export type SvgIconProps = {
  svgIcon?: Feature.EnterpriseWeb.Elements.Media.SvgIcon;
  className?: string;
};

const SvgIcon = ({ svgIcon, className }: SvgIconProps): JSX.Element => {
  if (!svgIcon?.fields?.svgCode?.value) {
    return <></>;
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: `${svgIcon?.fields?.svgCode?.value}` }}
    />
  );
};

export default SvgIcon;
