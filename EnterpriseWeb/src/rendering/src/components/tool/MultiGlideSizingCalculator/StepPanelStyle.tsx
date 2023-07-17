import { useState } from 'react';
// import { useTheme } from 'lib/context/ThemeContext';
// import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';
import clsx from 'clsx';

export const StepPanelStyle = (props: any): JSX.Element => {
  // const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());
  const { fields, activeStep } = props;

  const OPTIONS = [
    {
      text: fields?.PanelStyleText1?.value,
      image: fields?.PanelStyleImage1?.value,
      name: 'contemporary_cap',
    },
    {
      text: fields?.PanelStyleText2?.value,
      image: fields?.PanelStyleImage2?.value,
      name: 'contemporary_ccp',
    },
    {
      text: fields?.PanelStyleText3?.value,
      image: fields?.PanelStyleImage3?.value,
      name: 'traditional',
    },
  ];

  const [selectedOption, setSelectedOption] = useState(OPTIONS[0].name);
  const [error, setError] = useState<any>(null);

  const handleChangeRadioInput = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handleClickNext = () => {
    if (selectedOption === null) {
      setError('Select an option');
    } else {
      setError(null);
      props.onStepChange(activeStep + 1);
      props.userCallback({
        selectedPanelStyle: selectedOption,
      });
    }
  };
  return (
    <div className="flex flex-col items-center md:items-start">
      <div>
        <div className="font-bold">{fields?.StepTwoTitle?.value}</div>
        <div className="mt-5 flex flex-col md:flex-row md:space-x-5">
          {OPTIONS.map((item, idx) => (
            <div
              className={clsx({
                'my-5 mb-4 flex items-center rounded-[5px] border border-[#b9b9b9] bg-[#f7f7f7] p-5 font-semibold':
                  true,
                'border-[#b9b9b9] bg-[#f7f7f7]': selectedOption === item.name,
                'border-[#e3e3e3]': selectedOption !== item.name,
              })}
              key={idx}
            >
              <label
                htmlFor={`step-two-radio-${idx}`}
                className="text-gray-900 dark:text-gray-300 ml-2 cursor-pointer text-sm"
              >
                <input
                  id={`step-two-radio-${idx}`}
                  type="radio"
                  value={item.name}
                  name={item.name}
                  className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-6 w-6 text-[#b9b9b9] focus:ring-2 focus:ring-[#b9b9b9] dark:focus:ring-[#b9b9b9]"
                  checked={selectedOption === item.name}
                  onChange={handleChangeRadioInput}
                />
                <span className="ml-2.5">{item.text}</span>
                <ImageWrapper image={item?.image} additionalDesktopClasses="mt-4" />
              </label>
            </div>
          ))}
        </div>
        {error && <div className="font-semibold text-red-500">{error}</div>}
        <div className="mt-5">
          <MultiSlideSizingCalculatorActionButtons {...props} nextStep={handleClickNext} />
        </div>
      </div>
    </div>
  );
};
