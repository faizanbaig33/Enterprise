import { useState } from 'react';
import { useTheme } from 'lib/context/ThemeContext';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';

export const StepPanelStyle = (props: any): JSX.Element => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());
  const { fields } = props;
  
  const OPTIONS = [
    {
      text: fields?.TileButtonTextOne?.value,
      name: 'thermally'
    },
    {
      text: fields?.TileButtonTextTwo?.value,
      name: 'nonThermally'
    }
  ]

  const [selectedOption, setSelectedOption] = useState(OPTIONS[0].name)
  const [error, setError] = useState<any>(null)

  const handleChangeRadioInput = (e: any) => {
    setSelectedOption(e.target.value)
  }

  const handleClickNext = () => {
    if (selectedOption === null) {
      setError('Select an option')  
    } else {
      setError(null)
      props.nextStep()
      props.userCallback({
        selectedPanelStyle: selectedOption
      })
    }
  }
  return (
    <div>
      <div className='font-bold'>
        {fields?.StepTwoTitle?.value}
      </div>
      <div className='flex flex-col md:flex-row mt-5 md:space-x-5'>
        {OPTIONS.map((item, idx) => (
          <div className="flex items-center mb-4 border rounded-[5px] p-5 m-5 border-[#b9b9b9] bg-[#f7f7f7] font-semibold" key={idx}>
            <label htmlFor={`step-two-radio-${idx}`} className="ml-2 text-sm text-gray-900 dark:text-gray-300">
              <input
                id={`step-two-radio-${idx}`}
                type="radio"
                value={item.name}
                name={item.name}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={selectedOption === item.name}
                onChange={handleChangeRadioInput}
              />
              <span className='ml-2.5'>{item.text}</span>
            </label>
        </div>
        ))}
      </div>
      {error && <div className='text-red-500 font-semibold'>{error}</div>}
      <div className='mt-5'>
        <MultiSlideSizingCalculatorActionButtons {...props} nextStep={handleClickNext} />
      </div>
    </div>
  )
}