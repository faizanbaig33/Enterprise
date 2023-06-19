import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useTheme } from 'lib/context/ThemeContext';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';

export const MultiSlideSizingCalculatorActionButtons = (props: any) => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());
  const { fields } = props;

  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div className="flex items-center space-x-3">
      {props.currentStep > 1 && (
        <div>
          <button className={themeData.classes.prevButton} onClick={handleBack}>
            <FiArrowLeft size={16} />
            <span className="ml-2">{fields?.PreviousButtonText?.value}</span>
          </button>
        </div>
      )}
      <div>
        {props.currentStep < props.totalSteps && (
          <button className={themeData.classes.submitButton} onClick={handleNext}>
            <span className="mr-2">{fields?.NextButtonNext?.value}</span>
            <FiArrowRight size={16} />
          </button>
        )}
        {props.currentStep === props.totalSteps && (
          <button type="button" className={themeData.classes.submitButton} onClick={handleFinish}>
            {fields?.CalculateButtonText?.value}
          </button>
        )}
      </div>
    </div>
  );
};
