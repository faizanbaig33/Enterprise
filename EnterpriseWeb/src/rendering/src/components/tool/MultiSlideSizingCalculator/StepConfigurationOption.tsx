import { useState } from 'react';
import clsx from 'clsx';
import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';
import ImageWrapper from 'src/helpers/Media/ImageWrapper';

export const StepConfigurationOption = (props: any): JSX.Element => {
  const { fields, activeStep } = props;

  const OPTIONS = [
    {
      title: 'Stacking',
      value: 'stacking',
      image: fields?.StepOneButtonImage1,
    },
    {
      title: 'Pocketing',
      value: 'pocketing',
      image: fields?.StepOneButtonImage2,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(OPTIONS[0].value);
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
        selectedConfigurationOption: OPTIONS.find((item: any) => item.value === selectedOption),
        downloadLink:
          selectedOption === 'stacking'
            ? fields?.StackingDownLoadLink?.value
            : fields?.PocketingDownLoadLink?.value,
      });
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="w-full">
        <div className="font-bold">{fields?.StepOneTitle?.value}</div>
        <div className="flex flex-col md:flex-row md:space-x-5">
          {OPTIONS.map((item, idx) => (
            <div
              className={clsx({
                'my-5 mb-4 flex items-center rounded-[5px] border p-5': true,
                'border-[#b9b9b9] bg-[#f7f7f7]': selectedOption === item.value,
                'border-[#e3e3e3] bg-[#F8F6F4]': selectedOption !== item.value,
              })}
              key={idx}
            >
              <label
                htmlFor={`step-one-radio-${idx}`}
                className="text-md text-gray-900 dark:text-gray-300 ml-2 flex w-full cursor-pointer flex-row items-start text-center font-bold uppercase md:flex-col"
              >
                <ImageWrapper
                  image={item.image}
                  additionalMobileClasses="w-20 h-20 mr-2"
                  additionalDesktopClasses="mt-4 w-full"
                />
                <div className="flex flex-col items-start justify-center md:items-center">
                  <input
                    id={`step-one-radio-${idx}`}
                    type="radio"
                    value={item.value}
                    name={item.value}
                    className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 hidden h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    checked={selectedOption === item.value}
                    onChange={handleChangeRadioInput}
                  />
                  <div>{item.title}</div>
                  <div className="mt-2 text-[10px] text-gray">Viewed from Exterior</div>
                </div>
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
