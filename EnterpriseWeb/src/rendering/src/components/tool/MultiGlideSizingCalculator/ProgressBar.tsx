import { Line } from 'rc-progress';

export const ProgressBar = ({ percent, isComplete, activeStep, steps }: any) => {
  return (
    <div className="flex flex-col items-end">
      <Line
        percent={isComplete ? 100 : percent}
        strokeWidth={3}
        strokeColor="#f26924"
        trailWidth={3}
      />
      <div className="mt-1 font-bold">
        {activeStep} / {steps}{' '}
      </div>
    </div>
  );
};
