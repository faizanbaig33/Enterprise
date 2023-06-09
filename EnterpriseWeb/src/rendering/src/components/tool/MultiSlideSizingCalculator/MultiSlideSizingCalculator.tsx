import { Stepper, Step } from 'react-form-stepper';
import StepWizard from 'react-step-wizard';
import { useState } from 'react';
import { FiCheck, FiMail } from 'react-icons/fi';

// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

// Components
import { Component } from 'src/helpers/Component';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { StepConfigurationOption } from './StepConfigurationOption';
import { StepPanelStyle } from './StepPanelStyle';
import { StepESeriesSizingCalculator } from './StepESeriesSizingCalculator';
// import { MultiSlideSizingCalculatorActionButtons } from './ActionButtons';

/*
import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import React, { ChangeEvent, useState } from 'react';
import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { useExperienceEditor } from 'lib/utils'; */

export type MultiSlideSizingCalculatorProps =
  Feature.EnterpriseWeb.Components.Tool.MultiSlideSizingCalculatorProps;

const MultiSlideSizingCalculator = (props: MultiSlideSizingCalculatorProps): JSX.Element => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());

  const [stepWizard, setStepWizard] = useState(null);
  const [formData, setData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const assignStepWizard = (instance: any) => {
    setStepWizard(instance);
  };

  const assignUser = (val: any) => {
    // console.log("parent receive user callback");
    console.log(val);
    setData((data) => ({
      ...data,
      ...val,
    }));
  };

  const handleStepChange = (e: any) => {
    console.log('step change');
    console.log(e);
    setActiveStep(e.activeStep - 1);
    setIsComplete(false);
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
        <div className={themeData.classes.formStep}>
          <Stepper
            activeStep={activeStep}
            // connectorStyleConfig={themeData.stepperConnectorStyle}
            // connectorStateColors={true}
          >
            <Step
              label="Step 1"
              // styleConfig={themeData.stepperConnectorConfig}
              children={activeStep !== 0 && <FiCheck size={16} />}
            />
            <Step
              label="Step 2"
              // styleConfig={themeData.stepperConnectorConfig}
              children={activeStep === 2 && <FiCheck size={16} />}
            />
            <Step
              label="Step 3"
              // styleConfig={themeData.stepperConnectorConfig}
              children={isComplete && <FiCheck size={16} />}
            />
          </Stepper>
        </div>
        <div className="mt-5">
          <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
            <StepConfigurationOption fields={props.fields} userCallback={assignUser} />
            <StepPanelStyle data={formData} fields={props.fields} userCallback={assignUser} />
            <StepESeriesSizingCalculator
              formData={formData}
              fields={props.fields}
              completeCallback={handleComplete}
            />
          </StepWizard>
        </div>
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<MultiSlideSizingCalculatorProps>(MultiSlideSizingCalculator);
