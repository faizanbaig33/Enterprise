// import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';

import { useForm } from 'react-hook-form';
import React, { useState, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import ReactToPrint from 'react-to-print';

import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import CalculatorResult from './CalculatorResult';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { useExperienceEditor } from 'lib/utils';
import { OPTIONS, MIN_MAX_WIDTHS } from './constant';
import * as AWNumberUtil from 'src/lib/utils/aw-number-utils';
import clsx from 'clsx';

type CalcForm = {
  calculateUsing: string; //known_size
  width: string; //ew
  widthInches: string;
  widthFraction: string;
  height: string; //eh
  heightInches: string;
  heightFraction: string;
  stackingDirection: string;
  sillOption: string;
  sillRamp: string;
  insectScreen: string;
  screenConfiguration: string;
  panelNumber: string;
  panelStackingLocation: string;
  thicknessFinishedFloorInches: string;
  thicknessFinishedFloorFraction: string;
};

export const StepESeriesSizingCalculator = (props: any): JSX.Element => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());
  const { fields, formData } = props;
  const isEE = useExperienceEditor();

  const table1Ref = useRef<HTMLDivElement>(null);

  const panelStyle = formData?.selectedPanelStyle;
  const configuration = formData?.selectedConfigurationOption;

  //Modal settings
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  // Submit and update shared variables
  const [widthStates, setWidthStates] = useState({
    feet: 0,
    inches: 0,
    fraction: 0,
    msg: '',
    dimension: 0,
  });
  const [heightStates, setHeightStates] = useState({
    feet: 0,
    inches: 0,
    fraction: 0,
    msg: '',
    dimension: 0,
  });

  const [msgWidth, setMsgWidth] = useState('');
  const [msgHeight, setMsgHeight] = useState('');

  const [formState, setFormState] = useState({
    calculateUsing: 'rough_opening',
    width: '',
    widthInches: '0',
    widthFraction: '0',
    height: '',
    heightInches: '0',
    heightFraction: '0',
    stackingDirection: 'one_direction',
    sillOption: 'onfloor_drainage',
    sillRamp: 'none',
    insectScreen: 'none',
    screenConfiguration: 'single',
    panelNumber: '4',
    panelStackingLocation: 'interior',
    thicknessFinishedFloor: '',
    thicknessFinishedFloorInches: '0',
    thicknessFinishedFloorFraction: '0',
  });

  const [clearOpeningHeight, setClearOpeningHeight] = useState<string>('');
  const [clearOpeningWidth, setClearOpeningWidth] = useState<string>('');
  const [numberPanelList, setNumberPanelList] = useState([1, 2, 3, 4, 5, 6]);
  const [jambDepth, setJambDepth] = useState<string>('');
  const [panelHeight, setPanelHeight] = useState<string>('');
  const [panelWidth, setPanelWidth] = useState<string>('');
  const [pocketDepth, setPocketDepth] = useState<string>('');
  const [pocketWidth, setPocketWidth] = useState<string>('');
  const [roughOpeningHeightSubfloor, setRoughOpeningHeightSubfloor] = useState<string>('');
  const [roughOpeningHeightRecess, setRoughOpeningHeightRecess] = useState<string>('');
  const [roughPocketWidth, setRoughPocketWidth] = useState<string>('');
  const [roughOpeningWidth, setRoughOpeningWidth] = useState<string>('');
  // const [roughOpeningHeight, setRoughOpeningHeight] = useState<string>('');
  const [roughOpeningPocketWidth, setRoughOpeningPocketWidth] = useState<string>('');
  const [screenRoughOpeningWidth, setScreenRoughOpeningWidth] = useState<string>('');
  const [screenRoughOpeningHeight, setScreenRoughOpeningHeight] = useState<string>('');
  const [screenUnitSizeWidth, setScreenUnitSizeWidth] = useState<string>('');
  const [screenUnitSizeHeight, setScreenUnitSizeHeight] = useState<string>('');
  const [sillDepth, setSillDepth] = useState<string>('');
  const [unitHeight, setUnitHeight] = useState<string>('');
  const [unitWidth, setUnitWidth] = useState<string>('');

  const [isShowResults, setIsShowResults] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<CalcForm>({
    mode: 'onChange',
    defaultValues: {
      calculateUsing: 'rough_opening',
      width: '',
      widthInches: '0',
      widthFraction: '0',
      height: '',
      heightInches: '0',
      heightFraction: '0',
      stackingDirection: 'one_direction',
      sillOption: 'onfloor_drainage',
      sillRamp: 'none',
      insectScreen: 'none',
      screenConfiguration: 'single',
      panelNumber: '4',
      panelStackingLocation: 'interior',
      thicknessFinishedFloorInches: '0',
      thicknessFinishedFloorFraction: '0',
    },
  });

  const clearCalculations = () => {
    setJambDepth('-');
    setPanelHeight('-');
    setPanelWidth('-');
    setPocketDepth('-');
    setPocketWidth('-');
    // setRoughOpeningHeight('-');
    setRoughOpeningWidth('-');
    setRoughOpeningHeightSubfloor('-');
    setRoughOpeningHeightRecess('-');
    setSillDepth('-');
    setUnitWidth('-');
    setUnitHeight('-');
  };

  const openModal = (index: number) => {
    setIsLightboxVisible(true);
    setCurrentImageIndex(index);
  };

  const printResults = () => {
    const printContents = (document.getElementById('resultsOutput') as HTMLElement).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const resetForm = () => {
    //Clear results table
    setJambDepth('-');
    setPanelHeight('-');
    setPanelWidth('-');
    setPocketDepth('-');
    setPocketWidth('-');
    // setRoughOpeningHeight('-');
    setRoughOpeningWidth('-');
    setRoughOpeningHeightSubfloor('-');
    setRoughOpeningHeightRecess('-');
    setSillDepth('-');
    setUnitWidth('-');
    setUnitHeight('-');

    // Reset form fields
    resetField('calculateUsing');
    resetField('stackingDirection');
    resetField('sillOption');
    resetField('sillRamp');
    resetField('panelNumber');
    resetField('panelStackingLocation');
    resetField('width');
    resetField('widthInches');
    resetField('widthFraction');
    resetField('height');
    resetField('heightInches');
    resetField('heightFraction');
    resetField('insectScreen');
    resetField('screenConfiguration');
    setIsShowResults(false);
  };

  const calculateInsectScreenWidth = (
    configuration: string,
    stackingDirection: string,
    unitWidth: any,
    roughOpeningPocketWidth: any
  ) => {
    let screenUnitSizeWidth = 0;
    const unitWidthNum = parseFloat(unitWidth);
    const roughOpeningPocketWidthNum = parseInt(roughOpeningPocketWidth);

    // Screen Unit Width
    if (configuration === 'stacking') {
      if (stackingDirection === 'one_direction') {
        screenUnitSizeWidth = unitWidthNum + 1.517 + 2.265;
      } else if (stackingDirection === 'two_direction') {
        screenUnitSizeWidth = unitWidthNum + 2.265 + 2.265;
      }
    } else {
      // Pocketing
      if (stackingDirection === 'one_direction') {
        screenUnitSizeWidth = roughOpeningPocketWidthNum + 0.844 + 2.255;
      } else if (stackingDirection === 'two_direction') {
        screenUnitSizeWidth = roughOpeningPocketWidthNum + 2.255 + 2.255;
      }
    }

    return screenUnitSizeWidth;
  };

  const calculateUnitDimensions = () => {
    const {
      calculateUsing,
      panelNumber: numberPanels,
      sillOption: sillOptions,
      stackingDirection,
      thicknessFinishedFloor,
    } = formState;
    const { dimension: width }: any = widthStates;
    const { dimension: height }: any = heightStates;

    let clearOpeningWidth: any = 0;
    let clearOpeningHeight: any = 0;
    let roughOpeningHeight: any = 0;
    let roughOpeningHeightSubfloor: any = 0;
    let roughOpeningHeightRecess: any = 0;
    let roughOpeningPocketWidth: any = 0;
    let roughOpeningWidth: any = 0;
    let unitWidth: any = 0;
    let unitHeight: any = 0;

    // Panel Overlap
    const panelOverlap: any = calculatePanelOverlap(panelStyle);

    // The excel document uses Unit Height for the Height input, but different values for the Width input:
    // Pocketing -> Rough Opening w/o Pocket
    // Stacking  -> Unit
    if (configuration === 'pocketing') {
      switch (calculateUsing) {
        case 'rough_opening':
          roughOpeningWidth = parseFloat(width);

          // Rough Opening Height input is from top of subfloor, so calculate real rough opening height and rough opening including recess
          if (sillOptions === 'flush') {
            roughOpeningHeight = parseFloat(height) + 1.5 - parseFloat(thicknessFinishedFloor);
            roughOpeningHeightRecess = parseFloat(roughOpeningHeight);
            roughOpeningHeightSubfloor = parseFloat(height);
          } else {
            roughOpeningHeight = height;
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = height;
          }

          roughOpeningPocketWidth = pocketing_calculateRoughOpeningPocketWidthFromRoughOpeningWidth(
            parseFloat(roughOpeningWidth),
            stackingDirection,
            parseInt(numberPanels),
            parseFloat(panelOverlap)
          );

          unitWidth = calculateUnitWidthFromRoughOpeningWidth(roughOpeningWidth);
          unitHeight = calculateUnitHeightFromRoughOpeningHeight(roughOpeningHeight, sillOptions);

          clearOpeningWidth = calculateClearOpeningWidthFromInputWidth(
            roughOpeningPocketWidth,
            configuration,
            stackingDirection,
            parseInt(numberPanels),
            panelOverlap,
            panelStyle
          );
          clearOpeningHeight = calculateClearOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          break;
        case 'rough_opening_pocket':
          roughOpeningPocketWidth = parseFloat(width);

          // Rough Opening Height input is from top of subfloor, so calculate real rough opening height and rough opening including recess
          if (sillOptions === 'flush') {
            roughOpeningHeight = parseFloat(height) + 1.5 - parseFloat(thicknessFinishedFloor);
            roughOpeningHeightRecess = roughOpeningHeight;
            roughOpeningHeightSubfloor = parseFloat(height);
          } else {
            roughOpeningHeight = parseFloat(height);
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = parseFloat(height);
          }

          roughOpeningWidth = pocketing_calculateRoughOpeningWidthFromRoughOpeningPocketWidth(
            roughOpeningPocketWidth,
            stackingDirection,
            numberPanels,
            panelOverlap
          );

          unitWidth = calculateUnitWidthFromRoughOpeningWidth(roughOpeningWidth);
          unitHeight = calculateUnitHeightFromRoughOpeningHeight(roughOpeningHeight, sillOptions);

          clearOpeningWidth = calculateClearOpeningWidthFromInputWidth(
            roughOpeningPocketWidth,
            configuration,
            stackingDirection,
            numberPanels,
            panelOverlap,
            panelStyle
          );
          clearOpeningHeight = calculateClearOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          break;
        case 'clear_opening':
          clearOpeningWidth = parseFloat(width);
          clearOpeningHeight = parseFloat(height);

          roughOpeningPocketWidth = calculateInputWidthFromClearOpeningWidth(
            clearOpeningWidth,
            configuration,
            stackingDirection,
            numberPanels,
            panelOverlap,
            panelStyle
          );
          roughOpeningWidth = pocketing_calculateRoughOpeningWidthFromRoughOpeningPocketWidth(
            roughOpeningPocketWidth,
            stackingDirection,
            numberPanels,
            panelOverlap
          );
          unitWidth = calculateUnitWidthFromRoughOpeningWidth(roughOpeningWidth);

          unitHeight = calculateUnitHeightFromClearOpeningHeight(clearOpeningHeight, sillOptions);
          roughOpeningHeight = calculateRoughOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          // Rough Opening Height
          if (sillOptions === 'flush') {
            roughOpeningHeightRecess = roughOpeningHeight;
            roughOpeningHeightSubfloor = roughOpeningHeight - 1.5 + thicknessFinishedFloor;
          } else {
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = roughOpeningHeight;
          }

          break;
        case 'unit_dimensions':
          unitWidth = parseFloat(width);
          unitHeight = parseFloat(height);

          roughOpeningWidth = calculateRoughOpeningWidthFromUnitWidth(unitWidth);
          roughOpeningHeight = calculateRoughOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          // Rough Opening Height
          if (sillOptions === 'flush') {
            roughOpeningHeightRecess = roughOpeningHeight;
            roughOpeningHeightSubfloor = roughOpeningHeight - 1.5 + thicknessFinishedFloor;
          } else {
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = roughOpeningHeight;
          }

          roughOpeningPocketWidth = pocketing_calculateRoughOpeningPocketWidthFromRoughOpeningWidth(
            roughOpeningWidth,
            stackingDirection,
            numberPanels,
            panelOverlap
          );

          clearOpeningWidth = calculateClearOpeningWidthFromInputWidth(
            roughOpeningPocketWidth,
            configuration,
            stackingDirection,
            numberPanels,
            panelOverlap,
            panelStyle
          );
          clearOpeningHeight = calculateClearOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          break;
      }
    } else {
      // Stacking
      roughOpeningPocketWidth = 'N/A';

      switch (calculateUsing) {
        case 'rough_opening':
          roughOpeningWidth = parseFloat(width);

          // Rough Opening Height input is from top of subfloor, so calculate real rough opening height and rough opening including recess
          if (sillOptions === 'flush') {
            roughOpeningHeight = parseFloat(height) + 1.5 - parseFloat(thicknessFinishedFloor);
            roughOpeningHeightRecess = roughOpeningHeight;
            roughOpeningHeightSubfloor = parseFloat(height);
          } else {
            roughOpeningHeight = parseFloat(height);
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = parseFloat(height);
          }

          unitWidth = calculateUnitWidthFromRoughOpeningWidth(roughOpeningWidth);
          unitHeight = calculateUnitHeightFromRoughOpeningHeight(roughOpeningHeight, sillOptions);

          clearOpeningWidth = calculateClearOpeningWidthFromInputWidth(
            unitWidth,
            configuration,
            stackingDirection,
            numberPanels,
            panelOverlap,
            panelStyle
          );
          clearOpeningHeight = calculateClearOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          break;
        case 'clear_opening':
          clearOpeningWidth = parseFloat(width);
          clearOpeningHeight = parseFloat(height);

          unitWidth = calculateInputWidthFromClearOpeningWidth(
            clearOpeningWidth,
            configuration,
            stackingDirection,
            numberPanels,
            panelOverlap,
            panelStyle
          );
          unitHeight = calculateUnitHeightFromClearOpeningHeight(clearOpeningHeight, sillOptions);

          roughOpeningWidth = calculateRoughOpeningWidthFromUnitWidth(unitWidth);
          roughOpeningHeight = calculateRoughOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          // Rough Opening Height
          if (sillOptions === 'flush') {
            roughOpeningHeightRecess = roughOpeningHeight;
            roughOpeningHeightSubfloor = roughOpeningHeight - 1.5 + thicknessFinishedFloor;
          } else {
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = roughOpeningHeight;
          }

          break;
        case 'unit_dimensions':
          unitWidth = parseFloat(width);
          unitHeight = parseFloat(height);

          roughOpeningWidth = calculateRoughOpeningWidthFromUnitWidth(unitWidth);
          roughOpeningHeight = calculateRoughOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          // Rough Opening Height
          if (sillOptions === 'flush') {
            roughOpeningHeightRecess = roughOpeningHeight;
            roughOpeningHeightSubfloor = roughOpeningHeight - 1.5 + thicknessFinishedFloor;
          } else {
            roughOpeningHeightRecess = 'N/A';
            roughOpeningHeightSubfloor = roughOpeningHeight;
          }

          clearOpeningWidth = calculateClearOpeningWidthFromInputWidth(
            unitWidth,
            configuration,
            stackingDirection,
            numberPanels,
            panelOverlap,
            panelStyle
          );
          clearOpeningHeight = calculateClearOpeningHeightFromUnitHeight(unitHeight, sillOptions);

          break;
      }
    }

    return {
      unitWidth: unitWidth,
      unitHeight: unitHeight,
      roughOpeningWidth: roughOpeningWidth,
      roughOpeningHeight: roughOpeningHeight,
      roughOpeningHeightRecess: roughOpeningHeightRecess,
      roughOpeningHeightSubfloor: roughOpeningHeightSubfloor,
      roughOpeningPocketWidth: roughOpeningPocketWidth,
      clearOpeningWidth: clearOpeningWidth,
      clearOpeningHeight: clearOpeningHeight,
    };
  };

  // Rough Opening Width => Unit Width
  const calculateUnitWidthFromRoughOpeningWidth = (roughOpeningWidth: number) => {
    return roughOpeningWidth - 1;
  };

  // Rough Opening Height => Unit Height
  const calculateUnitHeightFromRoughOpeningHeight = (
    roughOpeningHeight: number,
    sillOptions: string
  ) => {
    if (sillOptions === 'flush') {
      return roughOpeningHeight - 0.75;
    } else {
      // onfloor_drainage
      return roughOpeningHeight - 0.5;
    }
  };

  // Unit Width => Rough Opening Width
  const calculateRoughOpeningWidthFromUnitWidth = (unitWidth: number) => {
    return unitWidth + 1;
  };

  // Unit Height => Rough Opening Height
  const calculateRoughOpeningHeightFromUnitHeight = (unitHeight: number, sillOptions: string) => {
    if (sillOptions === 'flush') {
      return unitHeight + 0.75;
    } else {
      // onfloor_drainage
      return unitHeight + 0.5;
    }
  };

  // Rough Opening with out Pocket Width => Rough Opening Width
  const pocketing_calculateRoughOpeningPocketWidthFromRoughOpeningWidth = (
    roughOpeningPocketWidth: number,
    stackingDirection: string,
    numberPanels: any,
    panelOverlap: number
  ) => {
    if (stackingDirection === 'one_direction') {
      return (
        (roughOpeningPocketWidth +
          (4.375 - panelOverlap * (numberPanels - 1)) / numberPanels -
          4.125) /
        (1 + 1 / numberPanels)
      );
    } else {
      // two_direction
      return (
        (roughOpeningPocketWidth +
          ((4.224 - panelOverlap * (numberPanels - 2)) * 2) / numberPanels -
          8.25) /
        (1 + 2 / numberPanels)
      );
    }
  };

  // Rough Opening Width => Rough Opening with out Pocket Width
  const pocketing_calculateRoughOpeningWidthFromRoughOpeningPocketWidth = (
    roughOpeningWidth: number,
    stackingDirection: string,
    numberPanels: any,
    panelOverlap: number
  ) => {
    if (stackingDirection === 'one_direction') {
      return (
        roughOpeningWidth * (1 + 1 / numberPanels) -
        (4.375 - panelOverlap * (numberPanels - 1)) / numberPanels +
        4.125
      );
    } else {
      // two_direction
      return (
        roughOpeningWidth * (1 + 2 / numberPanels) -
        ((4.224 - panelOverlap * (numberPanels - 2)) * 2) / numberPanels +
        8.25
      );
    }
  };

  // Clear Opening Height => Unit Height
  const calculateUnitHeightFromClearOpeningHeight = (
    clearOpeningHeight: number,
    sillOptions: string
  ) => {
    if (isOnFloorDrainage(sillOptions)) {
      return clearOpeningHeight + 3.363;
    } else {
      // flush
      return clearOpeningHeight + 3.863;
    }
  };

  // Unit Height => Clear Opening Height
  const calculateClearOpeningHeightFromUnitHeight = (unitHeight: any, sillOptions: string) => {
    if (isOnFloorDrainage(sillOptions)) {
      return parseFloat(unitHeight) - 3.363;
    } else {
      // flush
      return parseFloat(unitHeight) - 3.863;
    }
  };

  // Input Width => Clear Opening Width
  // Pocketing -> Rough Opening with out Pocket Width => Clear Opening Width
  // Stacking  -> Unit Width => Clear Opening Width
  const calculateClearOpeningWidthFromInputWidth = (
    inputWidth: any,
    configuration: string,
    stackingDirection: string,
    numberPanels: any,
    panelOverlap: any,
    panelStyle: string
  ) => {
    if (configuration === 'stacking') {
      if (stackingDirection === 'one_direction') {
        if (panelStyle === 'contemporary_ccp') {
          return (
            parseFloat(inputWidth) -
            (parseFloat(inputWidth) -
              4.25 +
              parseFloat(panelOverlap) * (parseFloat(numberPanels) - 1)) /
              parseFloat(numberPanels) -
            5.805
          );
        } else {
          // contemporary_cap or traditional
          return (
            parseFloat(inputWidth) -
            (parseFloat(inputWidth) -
              4.25 +
              parseFloat(panelOverlap) * (parseFloat(numberPanels) - 1)) /
              parseFloat(numberPanels) -
            4.788
          );
        }
      } else {
        // two_direction
        if (panelStyle === 'contemporary_ccp') {
          return (
            parseFloat(inputWidth) -
            2 *
              ((parseFloat(inputWidth) -
                4.974 +
                parseFloat(panelOverlap) * (parseFloat(numberPanels) - 2)) /
                parseFloat(numberPanels)) -
            6.539
          );
        } else {
          // contemporary_cap or traditional
          return (
            parseFloat(inputWidth) -
            2 *
              ((parseFloat(inputWidth) -
                4.974 +
                parseFloat(panelOverlap) * (parseFloat(numberPanels) - 2)) /
                parseFloat(numberPanels)) -
            5.522
          );
        }
      }
    } else {
      // pocketing
      if (stackingDirection === 'one_direction') {
        if (panelStyle === 'contemporary_ccp') {
          return parseFloat(inputWidth) - 5.476;
        } else {
          // contemporary_cap or traditional
          return parseFloat(inputWidth) - 5.187;
        }
      } else {
        // two_direction
        if (numberPanels === 2) {
          return parseFloat(inputWidth) - 5.772;
        } else {
          // more than two
          if (panelStyle === 'contemporary_ccp') {
            return parseFloat(inputWidth) - 5.432;
          } else {
            // contemporary_cap or traditional
            return parseFloat(inputWidth) - 5.171;
          }
        }
      }
    }
  };

  // Clear Opening Width => Input Width
  // Pocketing -> Clear Opening Width => Rough Opening with out Pocket Width
  // Stacking  -> Clear Opening Width => Unit Width
  const calculateInputWidthFromClearOpeningWidth = (
    clearOpeningWidth: any,
    configuration: string,
    stackingDirection: string,
    numberPanels: any,
    panelOverlap: any,
    panelStyle: string
  ) => {
    const clearOpeningWidthNum = parseFloat(clearOpeningWidth);
    const numberPanelsNum = parseInt(numberPanels);
    const panelOverlapNum = parseFloat(panelOverlap);

    if (configuration === 'stacking') {
      if (stackingDirection === 'one_direction') {
        if (panelStyle === 'contemporary_ccp') {
          return (
            ((clearOpeningWidthNum + 5.805) * numberPanelsNum -
              4.25 +
              panelOverlapNum * (numberPanelsNum - 1)) /
            (numberPanelsNum - 1)
          );
        } else {
          // contemporary_cap or traditional
          return (
            ((clearOpeningWidthNum + 4.788) * numberPanelsNum -
              4.25 +
              panelOverlapNum * (numberPanelsNum - 1)) /
            (numberPanelsNum - 1)
          );
        }
      } else {
        // two_direction
        if (panelStyle === 'contemporary_ccp') {
          return (
            ((clearOpeningWidthNum + 6.539) * numberPanelsNum -
              9.948 +
              2 * panelOverlapNum * (numberPanelsNum - 2)) /
            (numberPanelsNum - 2)
          );
        } else {
          // contemporary_cap or traditional
          return (
            ((clearOpeningWidthNum + 5.522) * numberPanelsNum -
              9.948 +
              2 * panelOverlapNum * (numberPanelsNum - 2)) /
            (numberPanelsNum - 2)
          );
        }
      }
    } else {
      // pocketing
      if (stackingDirection === 'one_direction') {
        if (panelStyle === 'contemporary_ccp') {
          return clearOpeningWidthNum + 5.476;
        } else {
          // contemporary_cap or traditional
          return clearOpeningWidthNum + 5.187;
        }
      } else {
        // two_direction
        if (numberPanelsNum === 2) {
          return clearOpeningWidthNum + 5.772;
        } else {
          // more than two
          if (panelStyle === 'contemporary_ccp') {
            return clearOpeningWidthNum + 5.432;
          } else {
            // contemporary_cap or traditional
            return clearOpeningWidthNum + 5.171;
          }
        }
      }
    }
  };

  // Input Width => Panel Width
  // Pocketing -> Rough Opening with out Pocket Width => Panel Width
  // Stacking  -> Unit Width => Panel Width
  const calculatePanelWidth = (
    inputWidth: any,
    configuration: string,
    stackingDirection: string,
    numberPanels: any,
    panelOverlap: any
  ) => {
    const inputWidthNum = parseFloat(inputWidth);
    const numberPanelsNum = parseInt(numberPanels);
    const panelOverlapNum = parseFloat(panelOverlap);
    let panelWidth;

    if (configuration === 'stacking') {
      if (stackingDirection === 'one_direction') {
        panelWidth =
          (inputWidthNum - 4.25 + panelOverlapNum * (numberPanelsNum - 1)) / numberPanelsNum;
      } else {
        // two_direction
        panelWidth =
          (inputWidthNum - 4.974 + panelOverlapNum * (numberPanelsNum - 2)) / numberPanelsNum;
      }
    } else {
      // pocketing
      if (stackingDirection === 'one_direction') {
        panelWidth =
          (inputWidthNum - 4.375 + panelOverlapNum * (numberPanelsNum - 1)) / numberPanelsNum;
      } else {
        // two_direction
        panelWidth =
          (inputWidthNum - 4.224 + panelOverlapNum * (numberPanelsNum - 2)) / numberPanelsNum;
      }
    }
    return AWNumberUtil.truncate(panelWidth, 3);
  };

  // Panel Overlap
  const calculatePanelOverlap = (panelStyle: string) => {
    if (panelStyle === 'traditional') {
      return 4.345;
    } else if (panelStyle === 'contemporary_cap') {
      return 2.75;
    } else if (panelStyle === 'contemporary_ccp') {
      return 2.187;
    } else {
      return 0;
    }
  };

  const roundNumber = (number: number) => {
    if (!isNaN(+number)) {
      return Number(number.toFixed(3));
    } else {
      return number;
    }
  };

  const convertToFeetInchesAndFraction = (number: number, roundingDirection: any) => {
    const whole = Math.floor(number);

    let feet = Math.floor(whole / 12);
    let inches = whole % 12;
    let fraction = AWNumberUtil.decimalToEigth(number, { roundingDirection: roundingDirection });

    // Handle overflow if we rounded up
    if (fraction === '1') {
      inches += 1;
      fraction = '0';

      if (inches === 12) {
        feet += 1;
        inches = 0;
      }
    }

    let formatted = '';

    if (feet > 0) {
      formatted += String(feet) + "'";
    }

    if (inches > 0) {
      formatted += ' ' + String(inches);
    }
    if (fraction && fraction !== '0') {
      // Only add it if we have a value and it isn't 0
      formatted += ' ' + fraction;
    }
    if (inches > 0 || (fraction && fraction !== '0')) {
      // Add the inch marker if we added inches or fraction
      formatted += '"';
    }

    return formatted;
  };

  const formatNumber = (number: any) => {
    if (!isNaN(+number)) {
      const rounded = AWNumberUtil.roundToEigth(number, AWNumberUtil.roundingDirections.closest);
      const mm = rounded * 25.4;
      const formatted = convertToFeetInchesAndFraction(
        rounded,
        AWNumberUtil.roundingDirections.closest
      );
      return formatted + '<br>' + ' (' + String(mm.toFixed(3)) + 'mm)';
    } else {
      return String(number);
    }
  };

  // const formatText = (text: string) => {
  //   return AWStringUtil.capitalize(text.replace('_', ' '));
  // };

  // const formatPanelGroup = (panelStyle: string) => {
  //   if (panelStyle === 'traditional') {
  //     return 'Traditional Aluminum-Clad Wood';
  //   } else if (panelStyle === 'contemporary_cap') {
  //     return 'Contemporary Aluminum';
  //   } else if (panelStyle === 'contemporary_ccp') {
  //     return 'Contemporary Aluminum-Clad Wood';
  //   }
  // };

  const isOnFloorDrainage = (sillType: string) => {
    return sillType === 'onfloor_drainage' || sillType === 'onfloor_drainage_raised_threshold';
  };

  const onSubmit = (data: CalcForm) => {
    if (msgWidth !== '' || msgHeight !== '') {
      setIsShowResults(false);
      return;
    }

    const jsonData = JSON.stringify(data, null, 2);
    const jsonObj = JSON.parse(jsonData);

    // const calculateUsing = jsonObj.calculateUsing;
    // const width = widthStates.dimension;
    // const height = heightStates.dimension;
    const insectScreens = jsonObj.insectScreen;
    const numberPanels = parseInt(jsonObj.panelNumber);
    // const panelStackingLocation = jsonObj.panelStackingLocation;
    // const screenConfiguration = jsonObj.screenConfiguration;
    const sillOptions = jsonObj.sillOption;
    const sillRamps = jsonObj.sillRamp;
    const stackingDirection = jsonObj.stackingDirection;
    // const thicknessFinishedFloor =
    //   parseFloat(jsonObj.thicknessFinishedFloorInches) +
    //   parseFloat(jsonObj.thicknessFinishedFloorFraction);

    // AWDataLayer.raiseModuleEvent('multiglide-sizing-calculator-module', 'calculate');

    // let clearOpeningWidth: any;
    // let clearOpeningHeight: any;
    let jambDepth: any = 0;
    let panelHeight: any;
    let panelWidth: any;
    let pocketDepth;
    let pocketWidth: any;
    // let roughOpeningHeight: any;
    // let roughOpeningHeightSubfloor: any;
    // let roughOpeningHeightRecess: any;
    let roughPocketWidth: any;
    // let roughOpeningPocketWidth: any;
    // let roughOpeningWidth: any;
    let screenRoughOpeningWidth: any;
    let screenRoughOpeningHeight: any;
    // let screenUnitSizeWidth: any;
    let screenUnitSizeHeight: any;
    let sillDepth: any;
    // let unitWidth: any;
    // let unitHeight: any;

    // Panel Overlap
    const panelOverlap = calculatePanelOverlap(panelStyle);

    const unitDimensions = calculateUnitDimensions();

    const unitWidth = unitDimensions.unitWidth;
    const unitHeight = unitDimensions.unitHeight;
    const roughOpeningWidth = unitDimensions.roughOpeningWidth;
    const roughOpeningHeight = unitDimensions.roughOpeningHeight;
    const roughOpeningHeightRecess = unitDimensions.roughOpeningHeightRecess;
    const roughOpeningHeightSubfloor = unitDimensions.roughOpeningHeightSubfloor;
    const roughOpeningPocketWidth = unitDimensions.roughOpeningPocketWidth;
    const clearOpeningWidth = unitDimensions.clearOpeningWidth;
    const clearOpeningHeight: any = unitDimensions.clearOpeningHeight;

    // Calculate Jamb Depth
    if (stackingDirection === 'one_direction') {
      if (insectScreens === 'none') {
        jambDepth = numberPanels * 2.5 + 0.389;
      } else if (insectScreens === 'single') {
        jambDepth = (numberPanels + 1) * 2.5 + 0.389;
      } else if (insectScreens === 'multi') {
        if (configuration === 'pocketing') {
          jambDepth = numberPanels * 2 * 2.5 + 0.389;
        } else {
          jambDepth = (numberPanels * 2 - 1) * 2.5 + 0.389;
        }
      } else if (insectScreens === 'retractable') {
        jambDepth = numberPanels * 2.5 + 0.389 + 3.5;
      }
    } else {
      // two_direction
      if (insectScreens === 'none') {
        jambDepth = (numberPanels / 2) * 2.5 + 0.389;
      } else if (insectScreens === 'single') {
        if (configuration === 'pocketing') {
          jambDepth = (numberPanels / 2 + 1) * 2.5 + 0.389;
        } else {
          jambDepth = '-'; // No calulation provided
        }
      } else if (insectScreens === 'multi') {
        if (configuration === 'pocketing') {
          jambDepth = numberPanels * 2.5 + 0.389;
        } else {
          jambDepth = (numberPanels - 1) * 2.5 + 0.389;
        }
      } else if (insectScreens === 'retractable') {
        jambDepth = (numberPanels / 2) * 2.5 + 0.389 + 3.5;
      }
    }

    // Calculate Sill Depth
    if (sillOptions === 'flush') {
      sillDepth = 'N/A';
    } else {
      //onfloor_drainage
      switch (sillRamps) {
        case 'none':
          sillDepth = jambDepth + 0.75;
          break;
        case 'interior':
          sillDepth = jambDepth + 1.4;
          break;
        case 'exterior':
          sillDepth = jambDepth + 2.053;
          break;
        case 'both':
          sillDepth = jambDepth + 3.453;
          break;
      }
    }

    // Panel Dimensions
    if (configuration === 'pocketing') {
      panelWidth = calculatePanelWidth(
        parseFloat(roughOpeningPocketWidth),
        configuration,
        stackingDirection,
        numberPanels,
        panelOverlap
      );
    } else {
      // Stacking
      panelWidth = calculatePanelWidth(
        parseFloat(unitWidth),
        configuration,
        stackingDirection,
        numberPanels,
        panelOverlap
      );
    }
    if (sillOptions === 'flush') {
      panelHeight = AWNumberUtil.truncate(parseFloat(unitHeight) - 3.644, 3);
    } else {
      // onfloor_drainage
      panelHeight = AWNumberUtil.truncate(parseFloat(unitHeight) - 3.144, 3);
    }

    // Rough Pocket Width
    if (configuration === 'pocketing') {
      roughPocketWidth = panelWidth + 4.125;
    } else {
      // Stacking
      roughPocketWidth = 'N/A';
    }

    // Pocket Width
    if (configuration === 'pocketing') {
      pocketWidth = panelWidth + 5.5;
    } else {
      pocketWidth = 'N/A';
    }

    // Pocket Depth
    if (configuration === 'pocketing') {
      if (stackingDirection === 'one_direction') {
        if (insectScreens === 'none') {
          if (numberPanels === 1) {
            pocketDepth = (numberPanels + 1) * 2.5 + 1.938;
          } else {
            // numberPanels > 1
            pocketDepth = numberPanels * 2.5 + 1.938;
          }
        } else if (insectScreens === 'single') {
          pocketDepth = (numberPanels + 1) * 2.5 + 1.938;
        } else if (insectScreens === 'multi') {
          pocketDepth = numberPanels * 2 * 2.5 + 1.938;
        }
      } else {
        // two_direction
        if (insectScreens === 'none') {
          if (numberPanels === 2) {
            pocketDepth = numberPanels * 2.5 + 1.938;
          } else {
            // numberPanels > 2
            pocketDepth = (numberPanels / 2) * 2.5 + 1.938;
          }
        } else if (insectScreens === 'single') {
          pocketDepth = (numberPanels / 2 + 1) * 2.5 + 1.938;
        } else if (insectScreens === 'multi') {
          pocketDepth = numberPanels * 2.5 + 1.938;
        }
      }
    } else {
      // stacking
      pocketDepth = 'N/A';
    }

    // Screen Unit Width
    const screenUnitSizeWidth = calculateInsectScreenWidth(
      configuration,
      stackingDirection,
      parseFloat(unitWidth),
      parseFloat(roughOpeningPocketWidth)
    );

    // Screen Unit Height
    if (insectScreens === 'retractable') {
      if (sillOptions === 'onfloor_drainage_raised_threshold') {
        screenUnitSizeHeight = unitHeight + 0.81;
      } else if (sillOptions === 'onfloor_drainage') {
        if (sillRamps === 'interior' || sillRamps === 'both') {
          screenUnitSizeHeight = unitHeight + 0.81;
        } else if (sillRamps === 'none' || sillRamps === 'exterior') {
          screenUnitSizeHeight = unitHeight + 0.81 + 0.973;
        }
      } else {
        // Flush
        if (sillRamps === 'none') {
          screenUnitSizeHeight = unitHeight + 0.81 + 0.473;
        }
      }
    }

    // Screen Rough Opening Width
    if (insectScreens === 'retractable') {
      screenRoughOpeningWidth = screenUnitSizeWidth + 0.5 + 0.5;
    }

    // Screen Rough Opening Height
    if (insectScreens === 'retractable') {
      screenRoughOpeningHeight = screenUnitSizeHeight + 0.5;
    }

    // Results
    setClearOpeningHeight(formatNumber(clearOpeningHeight));
    setClearOpeningWidth(formatNumber(clearOpeningWidth));
    setJambDepth(formatNumber(jambDepth));
    setPanelHeight(formatNumber(panelHeight));
    setPanelWidth(formatNumber(panelWidth));
    setPocketDepth(formatNumber(pocketDepth));
    setPocketWidth(formatNumber(pocketWidth));
    setRoughOpeningHeightSubfloor(formatNumber(roughOpeningHeightSubfloor));
    setRoughOpeningHeightRecess(formatNumber(roughOpeningHeightRecess));
    setRoughPocketWidth(formatNumber(roughPocketWidth));
    setRoughOpeningPocketWidth(formatNumber(roughOpeningPocketWidth));
    setRoughOpeningWidth(formatNumber(roughOpeningWidth));

    setScreenRoughOpeningWidth(formatNumber(screenRoughOpeningWidth));
    setScreenRoughOpeningHeight(formatNumber(screenRoughOpeningHeight));

    setScreenUnitSizeWidth(formatNumber(screenUnitSizeWidth));
    setScreenUnitSizeHeight(formatNumber(screenUnitSizeHeight));

    setSillDepth(formatNumber(sillDepth));
    setUnitHeight(formatNumber(unitHeight));
    setUnitWidth(formatNumber(unitWidth));

    setIsShowResults(true);

    props.lastStep();
    props.completeCallback();
  };

  const onDimensionFieldChange = (e: any, type: any) => {
    if (type === 'width') {
      const feet = e.target.name === 'width' ? e.target.value : getValues('width').trim();
      const inches = e.target.name === 'widthInches' ? e.target.value : getValues('widthInches');
      const fraction =
        e.target.name === 'widthFraction' ? e.target.value : getValues('widthFraction');

      if (parseFloat(feet) > 0 || parseFloat(inches) !== 0 || parseFloat(fraction) !== 0) {
        const length = parseFloat(feet) * 12 + parseFloat(inches) + parseFloat(fraction);
        const states = {
          feet: parseFloat(feet),
          inches: parseFloat(inches),
          fraction: parseFloat(fraction),
          dimension: length,
        };

        setWidthStates({
          ...widthStates,
          ...states,
        });

        updateForm(e, states);
      }
    } else if (type === 'height') {
      const feet = e.target.name === 'height' ? e.target.value : getValues('height').trim();
      const inches = e.target.name === 'heightInches' ? e.target.value : getValues('heightInches');
      const fraction =
        e.target.name === 'heightFraction' ? e.target.value : getValues('heightFraction');

      if (parseFloat(feet) || inches !== '0' || fraction !== '0') {
        const length = parseFloat(feet) * 12 + parseFloat(inches) + parseFloat(fraction);
        const states = {
          feet: parseFloat(feet),
          inches: parseFloat(inches),
          fraction: parseFloat(fraction),
          dimension: length,
        };

        setHeightStates({
          ...heightStates,
          ...states,
        });

        updateForm(e, states);
      }
    }
  };

  const updateForm = (e?: any, dimensionStates?: any) => {
    setIsShowResults(false);
    setMsgWidth('');
    setMsgHeight('');

    let msgWidth = '';
    let msgHeight = '';

    if (e?.target?.name !== 'width' && e?.target?.name !== 'height') {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const calculateUsing =
      e?.target?.name === 'calculateUsing' ? e?.target?.value : getValues('calculateUsing');
    const height =
      e?.target?.name && e?.target?.name?.includes('height')
        ? dimensionStates?.dimension
        : heightStates.dimension;
    const width =
      e?.target?.name && e?.target?.name?.includes('width')
        ? dimensionStates.dimension
        : widthStates.dimension;
    // const insectScreens =
    //   e?.target?.name === 'insectScreen' ? e?.target?.value : getValues('insectScreen');
    // let numberPanels =
    //   e?.target?.name === 'panelNumber' ? e?.target?.value : parseInt(getValues('panelNumber'));
    // let panelStackingLocation =
    //   e?.target?.name === 'panelStackingLocation'
    //     ? e?.target?.value
    //     : parseInt(getValues('panelStackingLocation'));
    const sillOptions =
      e?.target?.name === 'sillOption' ? e?.target?.value : getValues('sillOption');
    const stackingDirection =
      e?.target?.name === 'stackingDirection' ? e?.target?.value : getValues('stackingDirection');

    if (height > 0) {
      // Min/Max Height
      let minHeight = isOnFloorDrainage(sillOptions) ? 47.5 : 48;
      let maxHeight = isOnFloorDrainage(sillOptions) ? 119.5 : 120;

      switch (calculateUsing) {
        case 'rough_opening':
        case 'rough_opening_pocket':
          minHeight = calculateRoughOpeningHeightFromUnitHeight(minHeight, sillOptions);
          maxHeight = calculateRoughOpeningHeightFromUnitHeight(maxHeight, sillOptions);
          break;
        case 'clear_opening':
          minHeight = calculateClearOpeningHeightFromUnitHeight(minHeight, sillOptions);
          maxHeight = calculateClearOpeningHeightFromUnitHeight(maxHeight, sillOptions);
          break;
        case 'unit_dimensions':
          // min/max are defined in unit dimensions
          break;
      }

      const minFormatted = convertToFeetInchesAndFraction(
        minHeight,
        AWNumberUtil.roundingDirections.up
      );
      const maxFormatted = convertToFeetInchesAndFraction(
        maxHeight,
        AWNumberUtil.roundingDirections.down
      );

      const minMessage = 'Please enter a value greater than or equal to ' + minFormatted + '.';
      const maxMessage = 'Please enter a value less than or equal to ' + maxFormatted + '.';

      if (height < minHeight) {
        msgHeight = minMessage;
      }
      if (height > maxHeight) {
        msgHeight = maxMessage;
      }

      // setHeightStates({
      //   ...heightStates,
      //   ruleMax: roundNumber(minHeight),
      //   ruleMin: roundNumber(maxHeight),
      //   msg: msgHeight,
      // });
    } else {
      msgHeight = '';
    }

    if (width > 0) {
      // Min/Max Width
      const minMaxRows = minMaxes.filter((element) => {
        return (
          element.stackingDirection === stackingDirection &&
          element.configuration === configuration &&
          element.panelStyle === panelStyle
        );
      });

      let minWidth: any;
      let maxWidth: any;
      if (minMaxRows.length > 0) {
        switch (calculateUsing) {
          case 'rough_opening':
            const minWidthRow_ro = minMaxRows.reduce(
              function (total, currentValue) {
                return total.minWidthRoughOpening < currentValue.minWidthRoughOpening
                  ? total
                  : currentValue;
              },
              { minWidthRoughOpening: Number.MAX_VALUE }
            );
            const maxWidthRow_ro = minMaxRows.reduce(
              function (total, currentValue) {
                return total.maxWidthRoughOpening > currentValue.maxWidthRoughOpening
                  ? total
                  : currentValue;
              },
              { maxWidthRoughOpening: Number.MIN_VALUE }
            );

            minWidth = minWidthRow_ro.minWidthRoughOpening;
            maxWidth = maxWidthRow_ro.maxWidthRoughOpening;
            break;
          case 'rough_opening_pocket':
            const minWidthRow_rop = minMaxRows.reduce(
              function (total, currentValue) {
                return total.minWidthRoughOpeningWithOutPocket <
                  currentValue.minWidthRoughOpeningWithOutPocket
                  ? total
                  : currentValue;
              },
              { minWidthRoughOpeningWithOutPocket: Number.MAX_VALUE }
            );
            const maxWidthRow_rop = minMaxRows.reduce(
              function (total, currentValue) {
                return total.maxWidthRoughOpeningWithOutPocket >
                  currentValue.maxWidthRoughOpeningWithOutPocket
                  ? total
                  : currentValue;
              },
              { maxWidthRoughOpeningWithOutPocket: Number.MIN_VALUE }
            );

            minWidth = minWidthRow_rop.minWidthRoughOpeningWithOutPocket;
            maxWidth = maxWidthRow_rop.maxWidthRoughOpeningWithOutPocket;
            break;
          case 'clear_opening':
            const minWidthRow_co = minMaxRows.reduce(
              function (total, currentValue) {
                return total.minWidthClearOpening < currentValue.minWidthClearOpening
                  ? total
                  : currentValue;
              },
              { minWidthClearOpening: Number.MAX_VALUE }
            );
            const maxWidthRow_co = minMaxRows.reduce(
              function (total, currentValue) {
                return total.maxWidthClearOpening > currentValue.maxWidthClearOpening
                  ? total
                  : currentValue;
              },
              { maxWidthClearOpening: Number.MIN_VALUE }
            );

            minWidth = minWidthRow_co.minWidthClearOpening;
            maxWidth = maxWidthRow_co.maxWidthClearOpening;
            break;
          case 'unit_dimensions':
            const minWidthRow = minMaxRows.reduce(
              function (total, currentValue) {
                return total.minWidthUnitDimensions < currentValue.minWidthUnitDimensions
                  ? total
                  : currentValue;
              },
              { minWidthUnitDimensions: Number.MAX_VALUE }
            );
            const maxWidthRow = minMaxRows.reduce(
              function (total, currentValue) {
                return total.maxWidthUnitDimensions > currentValue.maxWidthUnitDimensions
                  ? total
                  : currentValue;
              },
              { maxWidthUnitDimensions: Number.MIN_VALUE }
            );

            minWidth = minWidthRow.minWidthUnitDimensions;
            maxWidth = maxWidthRow.maxWidthUnitDimensions;
            break;
        }

        const minFormatted = convertToFeetInchesAndFraction(
          minWidth,
          AWNumberUtil.roundingDirections.up
        );
        const maxFormatted = convertToFeetInchesAndFraction(
          maxWidth,
          AWNumberUtil.roundingDirections.down
        );

        const minMessage = 'Please enter a value greater than or equal to ' + minFormatted + '.';
        const maxMessage = 'Please enter a value less than or equal to ' + maxFormatted + '.';

        if (width < minWidth) {
          msgWidth = minMessage;
        } else if (width > maxWidth) {
          msgWidth = maxMessage;
        }

        // setWidthStates({
        //   ...widthStates,
        //   ruleMax: roundNumber(minWidth),
        //   ruleMin: roundNumber(maxWidth),
        //   msgMin: minMessage,
        //   msgMax: maxMessage,
        // });
      } else {
        msgWidth = '';
        // setWidthStates({
        //   ...widthStates,
        //   ruleMax: roundNumber(minWidth),
        //   ruleMin: roundNumber(maxWidth),
        //   msgMin: '',
        //   msgMax: '',
        // });
      }
    } else {
      msgWidth = '';
    }

    if (msgWidth !== '' || msgHeight !== '') {
      setMsgWidth(msgWidth);
      setMsgHeight(msgHeight);
      setIsShowResults(false);
    }

    // const widthValid = width.length > 0 ? this.$validator.element(this.formFields.$width) : false;
    const widthValid = true;

    // Update number of panels dropdown
    // Default to all valid options for our combination
    let numberPanelRows = minMaxes.filter((element) => {
      return (
        element.stackingDirection === stackingDirection &&
        element.configuration === configuration &&
        element.panelStyle === panelStyle
      );
    });

    // If we have a valid width, then filter further using the width
    if (widthValid) {
      const lookupWidth = Number(width);

      // Convert to array dimensions
      // Pocketing -> Rough Opening w/o Pocket
      // Stacking  -> Unit
      switch (calculateUsing) {
        case 'rough_opening':
          numberPanelRows = numberPanelRows.filter((element) => {
            return (
              element.minWidthRoughOpening <= lookupWidth &&
              element.maxWidthRoughOpening >= lookupWidth
            );
          });
          break;
        case 'rough_opening_pocket':
          numberPanelRows = numberPanelRows.filter((element) => {
            return (
              element.minWidthRoughOpeningWithOutPocket <= lookupWidth &&
              element.maxWidthRoughOpeningWithOutPocket >= lookupWidth
            );
          });
          break;
        case 'clear_opening':
          numberPanelRows = numberPanelRows.filter((element) => {
            return (
              element.minWidthClearOpening <= lookupWidth &&
              element.maxWidthClearOpening >= lookupWidth
            );
          });
          break;
        case 'unit_dimensions':
          numberPanelRows = numberPanelRows.filter((element) => {
            return (
              element.minWidthUnitDimensions <= lookupWidth &&
              element.maxWidthUnitDimensions >= lookupWidth
            );
          });
          break;
      }
    }

    // Convert to an object so we can populate the dropdown
    const numberPanelOptions = numberPanelRows.reduce(function (result, element) {
      if (
        element.stackingDirection === stackingDirection &&
        element.configuration === configuration &&
        element.panelStyle === panelStyle
      ) {
        result[element.numberOfPanels] = element.numberOfPanels;
      }
      return result;
    }, {});

    // setNumberPanelList(numberPanelOptions);
  };

  const minMaxes = MIN_MAX_WIDTHS.map((o: any) => {
    const panelOverlap = calculatePanelOverlap(o[2]);

    const obj: any = {
      stackingDirection: o[0],
      configuration: o[1],
      panelStyle: o[2],
      numberOfPanels: o[3],
    };

    if (obj.configuration === 'stacking') {
      // min/max are defined in unit dimensions
      obj.minWidthUnitDimensions = o[4];
      obj.maxWidthUnitDimensions = o[5];

      obj.minWidthRoughOpening = roundNumber(
        calculateRoughOpeningWidthFromUnitWidth(obj.minWidthUnitDimensions)
      );
      obj.maxWidthRoughOpening = roundNumber(
        calculateRoughOpeningWidthFromUnitWidth(obj.maxWidthUnitDimensions)
      );

      obj.minWidthClearOpening = roundNumber(
        calculateClearOpeningWidthFromInputWidth(
          obj.minWidthUnitDimensions,
          obj.configuration,
          obj.stackingDirection,
          obj.numberOfPanels,
          panelOverlap,
          obj.panelStyle
        )
      );
      obj.maxWidthClearOpening = roundNumber(
        calculateClearOpeningWidthFromInputWidth(
          obj.maxWidthUnitDimensions,
          obj.configuration,
          obj.stackingDirection,
          obj.numberOfPanels,
          panelOverlap,
          obj.panelStyle
        )
      );
    } else {
      // pocketing
      // min/max are defined in rough opening w/o pocket
      obj.minWidthRoughOpeningWithOutPocket = o[4];
      obj.maxWidthRoughOpeningWithOutPocket = o[5];

      obj.minWidthRoughOpening = roundNumber(
        pocketing_calculateRoughOpeningWidthFromRoughOpeningPocketWidth(
          obj.minWidthRoughOpeningWithOutPocket,
          obj.stackingDirection,
          obj.numberOfPanels,
          panelOverlap
        )
      );
      obj.maxWidthRoughOpening = roundNumber(
        pocketing_calculateRoughOpeningWidthFromRoughOpeningPocketWidth(
          obj.maxWidthRoughOpeningWithOutPocket,
          obj.stackingDirection,
          obj.numberOfPanels,
          panelOverlap
        )
      );

      obj.minWidthClearOpening = roundNumber(
        calculateClearOpeningWidthFromInputWidth(
          obj.minWidthRoughOpeningWithOutPocket,
          obj.configuration,
          obj.stackingDirection,
          obj.numberOfPanels,
          panelOverlap,
          obj.panelStyle
        )
      );
      obj.maxWidthClearOpening = roundNumber(
        calculateClearOpeningWidthFromInputWidth(
          obj.maxWidthRoughOpeningWithOutPocket,
          obj.configuration,
          obj.stackingDirection,
          obj.numberOfPanels,
          panelOverlap,
          obj.panelStyle
        )
      );

      obj.minWidthUnitDimensions = roundNumber(
        calculateUnitWidthFromRoughOpeningWidth(obj.minWidthRoughOpening)
      );
      obj.maxWidthUnitDimensions = roundNumber(
        calculateUnitWidthFromRoughOpeningWidth(obj.maxWidthRoughOpening)
      );
    }

    return obj;
  });

  if (!fields) {
    return <></>;
  }

  return (
    <div>
      <div className="font-bold">{fields?.StepThreeTitle?.value}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-12 mt-5">
        <div className={themeData.classes.formWrapper}>
          <div className={themeData.classes.columnSpan2}>
            <label className={themeData.classes.labelClass} htmlFor="calculateUsing">
              Calculate using known
            </label>
            <select
              className={themeData.classes.selectColumnSpan2}
              {...register('calculateUsing')}
              name="calculateUsing"
              defaultValue="rough_opening"
              onChange={updateForm}
            >
              {configuration === 'stacking' && (
                <>
                  <option value="rough_opening">Rough Opening</option>
                  <option value="clear_opening">Clear Opening</option>
                  <option value="Unit Dimensions">Unit Dimensions</option>
                </>
              )}
              {configuration === 'pocketing' && (
                <>
                  <option value="rough_opening">Rough Opening</option>
                  <option value="rough_opening_pocket">Rough Opening Without Pocket</option>
                  <option value="clear_opening">Clear Opening</option>
                  <option value="Unit Dimensions">unit_dimensions</option>
                </>
              )}
            </select>
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="width">
              Width (in inches)*
            </label>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="Width"
                  maxLength={25}
                  onInput={clearCalculations}
                  className={`${
                    errors.width || msgWidth
                      ? themeData.classes.errorInvalid
                      : themeData.classes.errorValid
                  }`}
                  {...register('width', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]*\.[0-9]*[1-9][0-9]*)$/,
                      message: 'Width is not valid.',
                    },
                  })}
                  name="width"
                  onChange={(e) => onDimensionFieldChange(e, 'width')}
                ></input>
              </div>
              <div>
                <select
                  className={
                    msgWidth ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1
                  }
                  {...register('widthInches')}
                  name="widthInches"
                  defaultValue="0"
                  onChange={(e) => onDimensionFieldChange(e, 'width')}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
              </div>
              <div>
                <select
                  className={
                    msgWidth ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1
                  }
                  {...register('widthFraction')}
                  name="widthFraction"
                  defaultValue="0"
                  onChange={(e) => onDimensionFieldChange(e, 'width')}
                >
                  <option value="0">0</option>
                  <option value="0.125">1 / 8</option>
                  <option value="0.25">1 / 4</option>
                  <option value="0.375">3 / 8</option>
                  <option value="0.5">1 / 2</option>
                  <option value="0.625">5 / 8</option>
                  <option value="0.75">3 / 4</option>
                  <option value="0.875">7 / 8</option>
                </select>
              </div>
            </div>
            {msgWidth && <div className="text-body text-error">{msgWidth}</div>}
            <label className={themeData.classes.labelClass} htmlFor="width">
              <span className={themeData.classes.helpText}>For help, refer to our</span>
              <button
                className={themeData.classes.modalLinkButton}
                type="button"
                onClick={() => {
                  openModal(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openModal(0);
                }}
              >
                {props.fields?.fractionChartLinkText?.value}
              </button>
            </label>
            {currentImageIndex === 0 && isLightboxVisible && (
              <ModalWrapper size="fluid" handleClose={() => setIsLightboxVisible(false)}>
                <div className="px-ml pb-ml pt-s">
                  <img
                    src={props.fields?.fractionChartImage?.value?.src ?? ''}
                    alt={props.fields?.fractionChartImage?.value?.alt}
                  />
                </div>
              </ModalWrapper>
            )}
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="height">
              Height (in inches)*
            </label>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="Height"
                  maxLength={25}
                  onInput={clearCalculations}
                  className={`${
                    errors.height || msgHeight
                      ? themeData.classes.errorInvalid
                      : themeData.classes.errorValid
                  }`}
                  {...register('height', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]*\.[0-9]*[1-9][0-9]*)$/,
                      message: 'Height is not valid.',
                    },
                  })}
                  name="height"
                  onChange={(e) => onDimensionFieldChange(e, 'height')}
                ></input>
              </div>
              <div>
                <select
                  className={
                    msgHeight ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1
                  }
                  {...register('heightInches')}
                  name="heightInches"
                  defaultValue="0"
                  onChange={(e) => onDimensionFieldChange(e, 'height')}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
              </div>
              <div>
                <select
                  className={
                    msgHeight ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1
                  }
                  {...register('heightFraction')}
                  name="heightFraction"
                  defaultValue="0"
                  onChange={(e) => onDimensionFieldChange(e, 'height')}
                >
                  <option value="0">0</option>
                  <option value="0.125">1 / 8</option>
                  <option value="0.25">1 / 4</option>
                  <option value="0.375">3 / 8</option>
                  <option value="0.5">1 / 2</option>
                  <option value="0.625">5 / 8</option>
                  <option value="0.75">3 / 4</option>
                  <option value="0.875">7 / 8</option>
                </select>
              </div>
            </div>
            {msgHeight && <div className="text-body text-error">{msgHeight}</div>}
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="stackingDirection">
              Stacking Direction*
            </label>
            <select
              className={themeData.classes.selectColumnSpan1}
              {...register('stackingDirection')}
              name="stackingDirection"
              defaultValue="one_direction"
              onChange={updateForm}
            >
              <option value="one_direction">1-Way Left</option>
              <option value="one_direction">1-Way Right</option>
              <option value="two_direction">2-Way</option>
            </select>
            {errors.stackingDirection && (
              <div className="text-body text-error">{errors.stackingDirection.message}</div>
            )}
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="sillOption">
              Sill Options*
            </label>
            <select
              className={themeData.classes.selectColumnSpan1}
              {...register('sillOption')}
              name="sillOption"
              defaultValue="onfloor_drainage"
              onChange={updateForm}
            >
              <option value="onfloor_drainage">On-Floor Drainage</option>
              <option value="onfloor_drainage_raised_threshold">
                On-Floor Drainage With Raised Threshold
              </option>
              <option value="flush">Flush</option>
            </select>
            {errors.sillOption && (
              <div className="text-body text-error">{errors.sillOption.message}</div>
            )}
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="panelNumber">
              # Of Panels*
            </label>
            <select
              className={themeData.classes.selectColumnSpan1}
              {...register('panelNumber')}
              name="panelNumber"
              onChange={updateForm}
            >
              {numberPanelList.map((numberPanel) => (
                <option key={numberPanel} value={numberPanel}>
                  {numberPanel}
                </option>
              ))}
            </select>
            {errors.panelNumber && (
              <div className="text-body text-error">{errors.panelNumber.message}</div>
            )}
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="sillRamps">
              Sill Ramps*
            </label>
            <select
              className={themeData.classes.selectColumnSpan1}
              {...register('sillRamp')}
              name="sillRamp"
              defaultValue="none"
              onChange={updateForm}
            >
              <option value="none">None</option>
              <option value="interior">Interior</option>
              <option value="exterior">Exterior</option>
              <option value="both">Both</option>
            </select>
            {errors.sillRamp && (
              <div className="text-body text-error">{errors.sillRamp.message}</div>
            )}
          </div>
          {configuration === 'stacking' && (
            <div className={themeData.classes.columnSpan1}>
              <label className={themeData.classes.labelClass} htmlFor="panelStackingLocation">
                Panel Stacking Location*
              </label>
              <select
                className={themeData.classes.selectColumnSpan1}
                {...register('panelStackingLocation')}
                name="panelStackingLocation"
                defaultValue="interior"
                onChange={updateForm}
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
              </select>
              {errors.panelStackingLocation && (
                <div className="text-body text-error">{errors.panelStackingLocation.message}</div>
              )}
            </div>
          )}
          {formState.sillOption === 'flush' && (
            <div className={themeData.classes.columnSpan1}>
              <label className={themeData.classes.labelClass} htmlFor="thicknessFinishedFloor">
                Thickness Of Finished Floor (In Inches)*
              </label>
              <div className="grid grid-cols-4 gap-4">
                <select
                  className={themeData.classes.selectColumnSpan1}
                  {...register('thicknessFinishedFloorInches')}
                  name="thicknessFinishedFloorInches"
                  defaultValue="0"
                  onChange={updateForm}
                  // onChange={(e) => onDimensionFieldChange(e, 'height')}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                <select
                  className={themeData.classes.selectColumnSpan1}
                  {...register('thicknessFinishedFloorFraction')}
                  name="thicknessFinishedFloorFraction"
                  defaultValue="0"
                  onChange={updateForm}
                >
                  <option value="0">0</option>
                  <option value="0.125">1 / 8</option>
                  <option value="0.25">1 / 4</option>
                  <option value="0.375">3 / 8</option>
                  <option value="0.5">1 / 2</option>
                  <option value="0.625">5 / 8</option>
                  <option value="0.75">3 / 4</option>
                  <option value="0.875">7 / 8</option>
                </select>
              </div>
            </div>
          )}
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="insectScreens">
              Insect Screens*
            </label>
            <select
              className={themeData.classes.selectColumnSpan1}
              {...register('insectScreen')}
              name="insectScreen"
              defaultValue="none"
              onChange={updateForm}
            >
              <option value="none">None</option>
              <option value="multi">Multi-panel</option>
              <option value="retractable">Retractable</option>
              <option value="single">Single</option>
            </select>
            {errors.insectScreen && (
              <div className="text-body text-error">{errors.insectScreen.message}</div>
            )}
          </div>
          {formState.insectScreen === 'retractable' && (
            <div className={themeData.classes.columnSpan1}>
              <label className={themeData.classes.labelClass} htmlFor="screenConfiguration">
                Screen Configuration*
              </label>
              <select
                className={themeData.classes.selectColumnSpan1}
                {...register('screenConfiguration')}
                name="screenConfiguration"
                defaultValue="single"
                onChange={updateForm}
              >
                <option value="single">Single Screen</option>
                <option value="double">Double Screen</option>
              </select>
              {errors.screenConfiguration && (
                <div className="text-body text-error">{errors.screenConfiguration.message}</div>
              )}
            </div>
          )}
          {/* Submit section */}
          <div className={themeData.classes.submitWrapper}>
            {isShowResults && (
              <button
                type="button"
                className={themeData.classes.prevButton}
                onClick={() => {
                  console.log('preview');
                  props.previousStep();
                  setIsShowResults(false);
                }}
              >
                <FiArrowLeft size={16} />
                <span className="ml-2">{fields?.PreviousButtonText?.value}</span>
              </button>
            )}
            {!isShowResults && (
              <button type="submit" className={themeData.classes.submitButton}>
                {fields?.CalculateButtonText?.value}
              </button>
            )}
            <button type="button" onClick={resetForm} className={themeData.classes.resetButton}>
              Reset calculator
              <span className="ml-xxs">
                <SvgIcon icon="reset" />
              </span>
            </button>
          </div>
        </div>
      </form>
      {isShowResults && (
        <div className="mt-4">
          <div className="col-span-12 flex flex-row items-center justify-between">
            <div className="mb-s font-sans text-sm-m font-heavy text-theme-text last:mb-0 lg:text-m">
              <h1>Results:</h1>
            </div>
            <div className="mb-s hidden items-end pr-2 md:relative md:block">
              <ReactToPrint
                trigger={() => {
                  return (
                    <button type="button" className={themeData.classes.printButton}>
                      <span className="mr-xxs text-darkprimary">
                        <SvgIcon icon="print" />
                      </span>
                      Print
                    </button>
                  );
                }}
                content={() => {
                  return table1Ref.current;
                }}
                documentTitle="E-Series Sizing Calculator Results"
                onBeforeGetContent={() => console.log('onBeforeGetContent')}
                onBeforePrint={() => console.log('onBeforePrint')}
                onAfterPrint={() => console.log('onAfterPrint')}
                removeAfterPrint
              />
            </div>
          </div>
          <div
            className={clsx({
              [themeData.classes.resultsOutputWrapper]: true,
            })}
            id="resultsOutput"
          >
            <div className={(themeData.classes.columnSpan1, 'print:mx-5')} ref={table1Ref}>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <div className="hidden print:mb-5 print:block">
                      E-Series Sizing Calculator Results
                    </div>
                    {/* Options Selected Table */}
                    <table className="min-w-full font-sans text-sm font-light">
                      <thead className={themeData.classes.tableHead}>
                        <tr>
                          <th colSpan={2} scope="col" className={themeData.classes.thLeft}>
                            Options Selected
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Configuration</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {formData?.selectedConfigurationOption || '-'}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Stacking Direction</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {OPTIONS.stackingDirection[getValues('stackingDirection')] || '-'}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Panel Style</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {OPTIONS.panelStyles[formData?.selectedPanelStyle] || '-'}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Panel Stacking Location</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {getValues('panelStackingLocation' || '-')}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}># Of Pannels</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {getValues('panelNumber') || '-'}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Sill Options</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {OPTIONS.sillOptions[getValues('sillOption')] || '-'}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Sill Ramps</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {OPTIONS.sillRamps[getValues('sillRamp')] || '-'}
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Insect Screens</td>
                          <td className={themeData.classes.tdColumnCenter}>
                            {OPTIONS.insectScreens[getValues('sillRamp')] || '-'}
                          </td>
                        </tr>
                        {formState.insectScreen === 'retractable' && (
                          <tr className={themeData.classes.tableRow}>
                            <td className={themeData.classes.tdColumn}>Screen Configuration</td>
                            <td className={themeData.classes.tdColumnCenter}>
                              {OPTIONS.screenConfigurations[getValues('screenConfiguration')] ||
                                '-'}
                            </td>
                          </tr>
                        )}
                        {formState.sillOption === 'flush' && (
                          <tr className={themeData.classes.tableRow}>
                            <td className={themeData.classes.tdColumn}>Thickness Finished Floor</td>
                            <td className={themeData.classes.tdColumnCenter}>
                              {formState.thicknessFinishedFloor || '-'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="hidden print:block">
                <CalculatorResult
                  data={{
                    formState,
                    configuration,
                    clearOpeningWidth,
                    clearOpeningHeight,
                    roughOpeningWidth,
                    roughOpeningHeightSubfloor,
                    roughOpeningHeightRecess,
                    roughOpeningPocketWidth,
                    unitWidth,
                    unitHeight,
                    panelWidth,
                    panelHeight,
                    roughPocketWidth,
                    pocketWidth,
                    pocketDepth,
                    jambDepth,
                    sillDepth,
                    screenRoughOpeningWidth,
                    screenRoughOpeningHeight,
                    screenUnitSizeWidth,
                    screenUnitSizeHeight,
                  }}
                />
              </div>
            </div>
            <div className={themeData.classes.columnSpan1}>
              <CalculatorResult
                data={{
                  formState,
                  configuration,
                  clearOpeningWidth,
                  clearOpeningHeight,
                  roughOpeningWidth,
                  roughOpeningHeightSubfloor,
                  roughOpeningHeightRecess,
                  roughOpeningPocketWidth,
                  unitWidth,
                  unitHeight,
                  panelWidth,
                  panelHeight,
                  roughPocketWidth,
                  pocketWidth,
                  pocketDepth,
                  jambDepth,
                  sillDepth,
                  screenRoughOpeningWidth,
                  screenRoughOpeningHeight,
                  screenUnitSizeWidth,
                  screenUnitSizeHeight,
                }}
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border border-black p-4">
            <div className="text-[20px] font-bold">Preparing for installation?</div>
            <a href={formData?.downloadLink} className={themeData.classes.submitButton}>
              Download site prep guide
            </a>
          </div>
        </div>
      )}
      {(props.fields?.footer || isEE) && (
        <div className="col-span-12">
          <RichTextWrapper field={props.fields?.footer} className={themeData.classes.footer} />
        </div>
      )}
    </div>
  );
};
