import { useTheme } from 'lib/context/ThemeContext';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';

const SocialIcons = ({ icons }: any) => {
  const { themeData } = useTheme(GlobalMastheadTheme);
  return (
    <div className={themeData.classes.socialIconsWrapper}>
      <div className={themeData.classes.iconWrapper}>
        {icons.map((icon: any) => (
          <a href={icon?.fields?.link?.value?.href} target="_blank" key={icon.id} rel="noreferrer">
            <img
              src={icon?.fields?.icon?.url}
              alt={icon?.fields?.icon?.name}
              className="h-[24px] w-[24px]"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
