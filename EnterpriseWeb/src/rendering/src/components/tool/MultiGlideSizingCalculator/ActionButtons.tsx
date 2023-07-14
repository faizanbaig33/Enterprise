import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useTheme } from 'lib/context/ThemeContext';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { MAX_STEPS } from './MultiSlideSizingCalculator';

export const MultiSlideSizingCalculatorActionButtons = (props: any) => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());
  const { fields, activeStep } = props;

  const handleBack = () => {
    props.onStepChange(activeStep - 1);
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div className="flex items-center justify-between md:justify-start">
      <div>
        {activeStep > 0 && (
          <button className={themeData.classes.prevButton} onClick={handleBack}>
            <FiArrowLeft size={16} />
            <span className="ml-2">{fields?.PreviousButtonText?.value}</span>
          </button>
        )}
      </div>
      <div>
        {activeStep < MAX_STEPS && (
          <button className={themeData.classes.submitButton} onClick={handleNext}>
            <span className="mr-2">{fields?.NextButtonNext?.value}</span>
            <FiArrowRight size={16} />
          </button>
        )}
        {activeStep === MAX_STEPS && (
          <button type="button" className={themeData.classes.submitButton} onClick={handleFinish}>
            {fields?.CalculateButtonText?.value}
          </button>
        )}
      </div>
    </div>
  );
};
