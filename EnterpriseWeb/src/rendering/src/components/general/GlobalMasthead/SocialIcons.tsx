import { useTheme } from 'lib/context/ThemeContext';
import { GlobalMastheadTheme } from './GlobalMasthead.theme';
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';

const SocialIcons = ({ icons, iconColor }: any) => {
  const { themeData } = useTheme(GlobalMastheadTheme);

  return (
    <div className={themeData.classes.socialIconsWrapper}>
      <div className={themeData.classes.iconWrapper}>
        {icons.map((icon: any) => (
          <a href={icon?.fields?.link?.value?.href} target="_blank" key={icon.id} rel="noreferrer">
            {icon?.fields?.icon?.fields?.Value?.value === 'facebook' && (
              <FaFacebook size={20} color={iconColor} />
            )}
            {icon?.fields?.icon?.fields?.Value?.value === 'twitter' && (
              <FaTwitter size={20} color={iconColor} />
            )}
            {icon?.fields?.icon?.fields?.Value?.value === 'pinterest' && (
              <FaPinterest size={20} color={iconColor} />
            )}
            {icon?.fields?.icon?.fields?.Value?.value === 'instagram' && (
              <FaInstagram size={20} color={iconColor} />
            )}
            {icon?.fields?.icon?.fields?.Value?.value === 'linkedin' && (
              <FaLinkedin size={20} color={iconColor} />
            )}
            {icon?.fields?.icon?.fields?.Value?.value === 'youtube' && (
              <FaYoutube size={20} color={iconColor} />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
