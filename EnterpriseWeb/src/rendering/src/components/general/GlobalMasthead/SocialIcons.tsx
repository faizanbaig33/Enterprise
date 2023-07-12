import { useTheme } from 'lib/context/ThemeContext';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';

const SocialIcons = ({ icons, textColor }: any) => {
  const { themeData } = useTheme(GlobalMastheadTheme);
  return (
    <div className={themeData.classes.socialIconsWrapper}>
      <div className={themeData.classes.iconWrapper}>
        {icons.map((icon: any) => (
          <a href={icon?.url} target="_blank" key={icon.id} rel="noreferrer">
            <div dangerouslySetInnerHTML={{ __html: icon?.fields?.svgCode?.value }} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
