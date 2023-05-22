import { twMerge } from 'tailwind-merge';
import { useTheme } from 'lib/context/ThemeContext';
import { ToggleSwitchTheme } from './ToggleSwitch.theme';

export type ToggleSwitchProps = {
  switchTitles: string[];
  activeSwitchIndex: number;
  toggleActiveSwtich: () => void;
};

const ToggleSwitch = ({
  switchTitles,
  activeSwitchIndex,
  toggleActiveSwtich,
}: ToggleSwitchProps): JSX.Element => {
  const { themeData } = useTheme(ToggleSwitchTheme);

  return (
    <label className={themeData.classes.toggleWrapper}>
      <input
        type="checkbox"
        className={themeData.classes.toggleCheckbox}
        onClick={() => toggleActiveSwtich()}
        checked={!!activeSwitchIndex}
      />
      <span className={themeData.classes.toggleSlider}>
        {switchTitles.map((title, index) => (
          <span
            key={index}
            className={twMerge(
              themeData.classes.toggleItem,
              activeSwitchIndex === index && themeData.classes.activeToggleItem
            )}
          >
            {title}
          </span>
        ))}
      </span>
    </label>
  );
};
export default ToggleSwitch;
