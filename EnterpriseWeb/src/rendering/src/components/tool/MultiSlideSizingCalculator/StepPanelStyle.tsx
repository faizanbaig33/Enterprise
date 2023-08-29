import { useState } from 'react';
import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';
import clsx from 'clsx';

export const StepPanelStyle = (props: any): JSX.Element => {
  const { fields, activeStep } = props;

  const OPTIONS = [
    {
      text: fields?.TileButtonTextOne?.value,
      name: 'thermally',
    },
    {
      text: fields?.TileButtonTextTwo?.value,
      name: 'nonThermally',
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
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
        selectedPanelStyle: OPTIONS.find((item: any) => item.name === selectedOption),
      });
    }
  };
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="w-full">
        <div className="font-bold">{fields?.StepTwoTitle?.value}</div>
        <div className="mt-5 flex flex-col md:flex-row md:space-x-5">
          {OPTIONS.map((item, idx) => (
            <div
              className={clsx({
                'my-5 mb-4 flex items-center rounded-[5px] border-2 border-[#C4BFB6] bg-[#F8F6F4] p-5 font-semibold':
                  true,
                'border-6 border-[#F26924]': selectedOption === item.name,
                'border border-[#C4BFB6] hover:border-2 hover:border-black':
                  selectedOption !== item.name,
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
                  className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-6 w-6 text-[#F26924] focus:ring-2 focus:ring-primary dark:focus:ring-[#b9b9b9]"
                  checked={selectedOption === item.name}
                  onChange={handleChangeRadioInput}
                />
                <span className="ml-2.5">{item.text}</span>
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
