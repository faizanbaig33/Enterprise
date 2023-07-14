import { useState } from 'react';
import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';

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
    <div>
      <div className="font-bold">{fields?.StepTwoTitle?.value}</div>
      <div className="mt-5 flex flex-col md:flex-row md:space-x-5">
        {OPTIONS.map((item, idx) => (
          <div
            className="m-5 mb-4 flex items-center rounded-[5px] border border-[#b9b9b9] bg-[#f7f7f7] p-5 font-semibold"
            key={idx}
          >
            <label
              htmlFor={`step-two-radio-${idx}`}
              className="text-gray-900 dark:text-gray-300 ml-2 text-sm"
            >
              <input
                id={`step-two-radio-${idx}`}
                type="radio"
                value={item.name}
                name={item.name}
                className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
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
  );
};
