import { useState } from 'react';
import clsx from 'clsx';
import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';

export const StepConfigurationOption = (props: any): JSX.Element => {
  const { fields, activeStep } = props;

  const OPTIONS = [
    {
      title: 'stacking',
      image: fields?.StepOneButtonImage1,
    },
    {
      title: 'pocketing',
      image: fields?.StepOneButtonImage2,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(OPTIONS[0].title);
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
        selectedConfigurationOption: selectedOption,
        downloadLink:
          selectedOption === 'stacking'
            ? fields?.StackingDownLoadLink?.value
            : fields?.PocketingDownLoadLink?.value,
      });
    }
  };

  return (
    <div>
      <div className="font-bold">{fields?.StepOneTitle?.value}</div>
      <div className="flex flex-col md:flex-row md:space-x-5">
        {OPTIONS.map((item, idx) => (
          <div
            className={clsx({
              'my-5 mb-4 flex items-center rounded-[5px] border p-5': true,
              'border-[#b9b9b9] bg-[#f7f7f7]': selectedOption === item.title,
              'border-[#e3e3e3]': selectedOption !== item.title,
            })}
            key={idx}
          >
            <label
              htmlFor={`step-one-radio-${idx}`}
              className="text-md text-gray-900 dark:text-gray-300 ml-2 flex w-full flex-row-reverse items-start text-center font-bold uppercase md:flex-col"
            >
              <div className="flex items-center">
                <input
                  id={`step-one-radio-${idx}`}
                  type="radio"
                  value={item.title}
                  name={item.title}
                  className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 hidden h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 md:block"
                  checked={selectedOption === item.title}
                  onChange={handleChangeRadioInput}
                />
                <span className="ml-2">{item.title}</span>
              </div>
              <ImageWrapper image={item.image} additionalDesktopClasses="mt-4" />
            </label>
          </div>
        ))}
      </div>
      {error && <div className="font-semibold text-red-500">{error}</div>}
      <div className="mt-5">
        <MultiSlideSizingCalculatorActionButtons {...props} nextStep={handleClickNext} />
      </div>
    </div>
  );
};
