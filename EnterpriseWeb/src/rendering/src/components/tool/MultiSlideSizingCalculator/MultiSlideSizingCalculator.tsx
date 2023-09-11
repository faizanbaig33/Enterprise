import { useState, useRef } from 'react';
import { FiCheck, FiMail } from 'react-icons/fi';

// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Slider from 'react-slick';

// Components
import { Component } from 'src/helpers/Component';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { StepConfigurationOption } from './StepConfigurationOption';
import { StepPanelStyle } from './StepPanelStyle';
import { StepESeriesSizingCalculator } from './StepESeriesSizingCalculator';
import Stepper from '../MultiGlideSizingCalculator/Stepper';
import { ProgressBar } from '../MultiGlideSizingCalculator/ProgressBar';

export const MAX_STEPS = 2;

export type MultiSlideSizingCalculatorProps =
  Feature.EnterpriseWeb.Components.Tool.MultiSlideSizingCalculatorProps;

const MultiSlideSizingCalculator = (props: MultiSlideSizingCalculatorProps): JSX.Element => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());

  const slider = useRef<Slider>(null);
  const eleRef = useRef<any>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    touchMove: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [isResetForm, setIsResetForm] = useState(false);
  const [formData, setData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const assignFormData = (val: any) => {
    // console.log("parent receive user callback");
    console.log(val);
    setIsResetForm(false);
    setData((data) => ({
      ...data,
      ...val,
    }));
  };

  const resetFormData = () => {
    setData({});
    setIsResetForm(true);
  };

  const handleStepChange = (step: number) => {
    eleRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (step <= MAX_STEPS) {
      slider?.current?.slickGoTo(step);
      setActiveStep(step);
      setIsComplete(false);
    }
  };

  const handleComplete = () => {
    // alert("You r done. TQ");
    setIsComplete(true);
  };

  return (
    <Component variant="lg" dataComponent="tool/multislidesizingcalculator" {...props}>
      <div className="col-span-12">
        <div className={themeData.classes.title}>MultiSlide Door Sizing Calculator</div>
        <div className={themeData.classes.descriptionWrapper}>
          <div className={themeData.classes.description}>
            <p>
              Sizing up a door of this nature is no small task. At Andersen, we know every detail is
              important which is why we've created a sizing calculator to guide you on how to
              properly design, specify, and prepare your opening for this door. We know having as
              much information up front as possible lends to a more successful installation and
              experience.
            </p>
            <br />
            <p>
              Begin by selecting the options you're interested in, then click the calcuate button.
              Not sure what you're looking for? Visit the Folding Patio Door page for more
              information.
            </p>
            <br />
            <p>All fields required.</p>
          </div>
          <div className={themeData.classes.help}>
            <div className={themeData.classes.helpContent}>
              <p className="text-[16px] font-bold">Need help?</p>
              <p>Contact Architectural Services at</p>
              <p className="text-[14px] font-semibold text-[#f26924]">1-800-299-9029</p>
              <p>M-F 8 AM - 6 AM CST</p>
              <p className="flex items-center">
                <span>or</span>
                <span className="ml-1 flex items-center text-[#f26924]">
                  <span className="mr-1">email us</span>
                  <FiMail size={12} />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={themeData.classes.formStep} ref={eleRef}>
          <div className="hidden md:block">
            <Stepper
              isComplete={isComplete}
              activeStep={activeStep}
              onStepChange={setActiveStep}
              sliderRef={slider}
            />
          </div>
          <div className="md:hidden">
            <ProgressBar
              activeStep={activeStep + 1}
              steps={MAX_STEPS + 1}
              percent={(Number(activeStep + 1) / (MAX_STEPS + 1)) * 100}
              isComplete={isComplete}
            />
          </div>
        </div>
        <div className="mt-5">
          <Slider ref={slider} {...sliderSettings} swipeToSlide={false}>
            <StepConfigurationOption
              fields={props.fields}
              activeStep={activeStep}
              isResetForm={isResetForm}
              onStepChange={handleStepChange}
              userCallback={assignFormData}
            />
            <StepPanelStyle
              data={formData}
              fields={props.fields}
              activeStep={activeStep}
              isResetForm={isResetForm}
              onStepChange={handleStepChange}
              userCallback={assignFormData}
            />
            <StepESeriesSizingCalculator
              formData={formData}
              activeStep={activeStep}
              fields={props.fields}
              onStepChange={handleStepChange}
              onResetForm={resetFormData}
              previousStep={() => handleStepChange(activeStep - 1)}
              completeCallback={handleComplete}
            />
          </Slider>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<MultiSlideSizingCalculatorProps>(MultiSlideSizingCalculator);
