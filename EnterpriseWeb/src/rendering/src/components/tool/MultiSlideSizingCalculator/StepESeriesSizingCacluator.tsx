import classNames from 'classnames';
// import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';

import { useForm } from 'react-hook-form';
import React, { ChangeEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import { MultiSlideSizingCalculatorTheme } from './MultiSlideSizingCalculator.theme';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { useExperienceEditor } from 'lib/utils';
import * as AWNumberUtil from 'src/lib/utils/aw-number-utils'

type CalcForm = {
  calcUsing: string; //known_size
  width: string; //ew
  widthInches: string;
  widthFraction: string;
  height: string; //eh
  heightInches: string;
  heightFraction: string;
  stackingDirection: string;
  sillOption: string;
  panelNumber: string;
  panelStackingLocation: string;
  thicknessFinishedFloorInches: string;
  thicknessFinishedFloorFraction: string
};

const MAX_WIDTH_ARRAY = [
    ["stacking", "thermally", "1-Way Left", 350.5],
    ["stacking", "thermally", "1-Way Right", 350.5],
    ["stacking", "thermally", "2-Way", 522.375],
    ["stacking", "thermally", "Double Active", 351.25],
    ["stacking", "nonThermally", "1-Way Left", 488.5],
    ["stacking", "nonThermally", "1-Way Right", 488.5],
    ["stacking", "nonThermally", "2-Way", 522.375],
    ["stacking", "nonThermally", "Double Active", 489],
    ["pocketing", "thermally", "1-Way Left", 420.625],
    ["pocketing", "thermally", "1-Way Right", 420.625],
    ["pocketing", "thermally", "2-Way", 522.375],
    ["pocketing", "nonThermally", "1-Way Left", 536],
    ["pocketing", "nonThermally", "1-Way Right", 536],
    ["pocketing", "nonThermally", "2-Way", 522.375]
  ]

export const StepESeriesSizingCalculator = (props: any): JSX.Element => {
  const { themeData } = useTheme(MultiSlideSizingCalculatorTheme());
  const { fields, formData } = props;
  const isEE = useExperienceEditor();

  const pluginName = 'awMultislideSizingCalculator';

  const panelStyle = formData?.selectedPanelStyle
  const configuration = formData?.selectedConfigurationOption
  const lockStileOffset = 2.25;
  const interlockPairOffset = 0.924;
  const interlockStileOffset = 1.674;

  //Modal settings
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  //Calculator values
  // const [casingDimensionWidth, setCasingDimensionWidth] = useState<string>();
  // const [casingDimensionHeight, setCasingDimensionHeight] = useState<string>();
  // const [overallUnitSizeWidth, setOverallUnitSizeWidth] = useState<string>();
  // const [overallUnitSizeHeight, setOverallUnitSizeHeight] = useState<string>();
  // const [masonryOpeningWidth, setMasonryOpeningWidth] = useState<string>();
  // const [masonryOpeningHeight, setMasonryOpeningHeight] = useState<string>();

  // Submit and update shared variables
  const [interlocks, setInterlocks] = useState("");
  const [widthStates, setWidthStates] = useState({
    feet: 0,
    inches: 0,
    fraction: 0,
    msg: '',
    ruleMin: '',
    ruleMax: '',
    dimension: 0,
  })
  const [heightStates, setHeightStates] = useState({
    feet: 0,
    inches: 0,
    fraction: 0,
    msg: '',
    ruleMin: '',
    ruleMax: '',
    dimension: 0,
  })
  
  const [msgWidth, setMsgWidth] = useState('')
  const [msgHeight, setMsgHeight] = useState('')

  const [formState, setFormState] = useState({
    calcUsing: '',
    width: '',
    widthInches: '',
    widthFraction: '',
    height: '',
    heightInches: '',
    heightFraction: '',
    stackingDirection: '',
    sillOption: '',
    panelNumber: '',
    panelStackingLocation: '',
    thicknessFinishedFloorInches: '',
    thicknessFinishedFloorFraction: '',
  })

  const [jambWidth, setJambWidth] = useState(0)
  const [lockStileEmbedment, setLockStileEmbedment] = useState(0)
  const [backStileEmbedment, setBackStileEmbedment] = useState(0)
  const [backStileOffset, setBackStileOffset] = useState(0)
  const [pocketOffset, setPocketOffset] = useState(0)
  const [biPartPairOffset, setBiPartPairOffset] = useState(0)    
  const [pocketCount, setPocketCount] = useState(0)
  const [minPanelNumber, setMinPanelNumber] = useState(0)
  const [maxPanelNumber, setMaxPanelNumber] = useState(0)
  const [numberPanels, setNumberPanels] = useState([1, 2, 3, 4, 5, 6])

  const [jambDepth, setJambDepth] = useState<string>('');
  const [panelHeight, setPanelHeight] = useState<string>('')
  const [panelWidth, setPanelWidth] = useState<string>('')
  const [pocketDepth, setPocketDepth] = useState<string>('')
  const [pocketWidth, setPocketWidth] = useState<string>('')
  const [roughOpeningHeightSubfloor, setRoughOpeningHeightSubfloor] = useState<string>('')
  const [roughOpeningHeightRecess, setRoughOpeningHeightRecess] = useState<string>('')
  const [roughOpeningWidth, setRoughOpeningWidth] = useState<string>('')
  // const [roughOpeningHeight, setRoughOpeningHeight] = useState<string>('');
  const [roughOpeningPocketWidth, setRoughOpeningPocketWidth] = useState<string>('')
  const [sillDepth, setSillDepth] = useState<string>('')
  const [unitHeight, setUnitHeight] = useState<string>('')
  const [unitWidth, setUnitWidth] = useState<string>('')

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
      calcUsing: 'Rough Opening',
      width: '',
      widthInches: '0',
      widthFraction: '0',
      height: '',
      heightInches: '0',
      heightFraction: '0',
      stackingDirection: '1-Way Left',
      sillOption: 'Standard On-Floor Drainage',
      panelNumber: '4',
      panelStackingLocation: 'Interior',
      thicknessFinishedFloorInches: '0',
      thicknessFinishedFloorFraction: '0'
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
    resetField('calcUsing');
    resetField('stackingDirection');
    resetField('sillOption');
    resetField('panelNumber');
    resetField('panelStackingLocation');
    resetField('width');
    resetField('widthInches');
    resetField('widthFraction');
    resetField('height');
    resetField('widthInches');
    resetField('widthFraction');
  };

  const funcSetInterlocks = (unitHeight: any) => {
    if (unitHeight > 119.375) {
        return 'heavy_duty';
    } else {
        return 'standard';
    }
  }

  const calculateMinWidth = (stackingDirection: any, configuration: any, numberPanels: any, calcUsing: any, pocketWidth: any) => {
    let minRailLength = 0;
    // Minimum width resulting in a minimum panel rail length of 20.154” (this is the corresponding rail length from the 48” x 36” 2 panel limiting size)
    let minWidth = 47.875;

    while (minRailLength < 20.153) {
        minWidth += 0.125;                
        minRailLength = calculateRailLength(stackingDirection, configuration, minWidth, numberPanels);  
    }

    //rough_opening_pocket
    //if (calcUsing === 'rough_opening_pocket') {                
    //    var pocketWidth = (configuration === 'pocketing') ? minRailLength + interlockStileOffset + pocketOffset + 0.375 : 0;

    //    minWidth = minWidth - pocketWidth;
    //}

    return minWidth;
  }

  const calculatePanelHeightFromUnitHeight = (unitHeight: any, panelStyle: any, sillOptions: any) => {
      if (panelStyle === 'thermally') {
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {
              return AWNumberUtil.truncate(unitHeight - 3.066, 3);
          } else if (sillOptions === 'Tile Track') {
              return AWNumberUtil.truncate(unitHeight - 2.613, 3);
          } else if (sillOptions === 'Low Profile') {
              return AWNumberUtil.truncate(unitHeight - 2.181, 3);
          }
      } else { // nonThermally
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {
              return AWNumberUtil.truncate(unitHeight - 2.908, 3);
          } else if (sillOptions === 'Tile Track') {
              return AWNumberUtil.truncate(unitHeight - 2.455, 3);
          } else if (sillOptions === 'Low Profile') {
              return AWNumberUtil.truncate(unitHeight - 2.023, 3);
          }
      }
  }

  const calculateRailLength = (stackingDirection: any, configuration: any, unitWidth: any, numberPanels: any) => {
      var railLength = 0;

      if (stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') {
          if (configuration === 'stacking') {
              railLength = (unitWidth - (2 * jambWidth) + lockStileEmbedment + backStileEmbedment - lockStileOffset - backStileOffset - (interlockPairOffset * (numberPanels - 1))) / numberPanels;
          } else { // pocketing
              railLength = (unitWidth - jambWidth + lockStileEmbedment - pocketOffset - lockStileOffset - (interlockPairOffset * numberPanels)) / (numberPanels + 1);
          }
      } else if (stackingDirection === 'Double Active' && configuration === 'stacking') {
          railLength = (unitWidth - (2 * jambWidth) + 2 * lockStileEmbedment - 2 * lockStileOffset - (interlockPairOffset * (numberPanels - 1))) / numberPanels;
      } else { //2-Way
          if (configuration === 'stacking') {
              railLength = (unitWidth - (2 * jambWidth) + 2 * backStileEmbedment - 2 * backStileOffset - biPartPairOffset - (interlockPairOffset * (numberPanels - 2))) / numberPanels;
          } else { // pocketing                    
              railLength = (unitWidth - biPartPairOffset - (interlockPairOffset * numberPanels) - 2 * pocketOffset) / (numberPanels + 2);
          }
      }            

      return AWNumberUtil.truncate(railLength, 3);
  }

  // Unit Height => Rough Opening Height
  const calculateRoughOpeningHeightFromUnitHeight = (unitHeight: any) => {            
      return parseFloat(unitHeight) + 0.625;            
  }
          
  // Unit Width => Rough Opening Width
  const calculateRoughOpeningWidthFromUnitWidth = (unitWidth: any) => {            
      return parseFloat(unitWidth) + 0.75;
  }

  // Rough Opening Height => Unit Height
  const calculateUnitHeightFromRoughOpeningHeight = (roughOpeningHeight: any) => {            
      return parseFloat(roughOpeningHeight) - 0.625;
  }

  // Rough Opening Width => Unit Width
  const calculateUnitWidthFromRoughOpeningWidth = (roughOpeningWidth: any) => {            
      return parseFloat(roughOpeningWidth) - 0.75;
  }

  const calculateJambWidth = (panelStyle: any, stackingDirection: any, configuration: any) => {
      let jambWidth_temp = 0;

      if (!(stackingDirection === '2-Way' && configuration === 'pocketing')) {
          if (panelStyle === 'nonThermally') {
            jambWidth_temp = 1.81;
          } else {
            jambWidth_temp = 1.968;
          }
      }

      return jambWidth_temp;
  }

  const calculateLockStileEmbedment = (stackingDirection: any) => {
      var lockStileEmbedment = 0;
      if (stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') {
          lockStileEmbedment = 0.53;
      } else if (stackingDirection === 'Double Active') {
          lockStileEmbedment = 0.593;
      }
      
      return lockStileEmbedment;
  }

  const calculateBackStileEmbedment = (panelStyle: any, stackingDirection: any, configuration: any) => {
      var backStileEmbedment = 0;
      if (stackingDirection != 'Double Active' && configuration === 'stacking') {
          if (panelStyle === 'nonThermally') {
              backStileEmbedment = 1.137;
          } else {
              backStileEmbedment = 1.186;
          }
      }
      
      return backStileEmbedment;
  }

  const calculateBackStileOffset = (panelStyle: any, stackingDirection: any, configuration: any) => {
      var backStileOffset = 0;
      if (stackingDirection != 'Double Active' && configuration === 'stacking') {
          if (panelStyle === 'nonThermally') {
              backStileOffset = 2.25;
          } else {
              backStileOffset = 2.299;
          }
      }
      
      return backStileOffset
  }

  const calculateDaylightPocketWidth = (daylightRailLength: any, interlockStileOffset: any, pocketOffset: any) => {
      return daylightRailLength + interlockStileOffset + pocketOffset + 0.375;
  }

  const calculateDaylightRailLength = (inputWidth: any, stackingDirection: any, lockStileOffset: any, lockStileEmbedment: any, jambWidth: any, numberPanels: any, interlockPairOffset: any, biPartPairOffset: any) => {
      switch (stackingDirection) {
          case "1-Way Left":
          case "1-Way Right":
              if (numberPanels === 1) {
                  return inputWidth + 0.125 - lockStileOffset + lockStileEmbedment - jambWidth - 0.375;
              } else {
                  return (inputWidth + 0.125 - (numberPanels - 1) * interlockPairOffset - lockStileOffset + lockStileEmbedment - jambWidth - 0.375) / numberPanels;
              }
          case "2-Way":
              if (numberPanels === 2) {
                  return (inputWidth - biPartPairOffset + 0.25) / 2;
              } else {
                  return (inputWidth - (numberPanels - 2) * interlockPairOffset - biPartPairOffset + 0.25) / numberPanels;
              }
      }
      return null;
  }

  const calculatePocketCount = (configuration: any, stackingDirection: any) => {            
      var pocketCount = 0;

      if (configuration === 'pocketing') {
          if (stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') {
              pocketCount = 1;
          } else if (stackingDirection = '2-Way') {
              pocketCount = 2;
          }
      }
      
      return pocketCount;
  }

  const calculatePocketOffset = (interlockStileOffset: any, stackingDirection: any, configuration: any, numberPanels: any, interlocks: any, panelStyle: any) => {            
      var pocketOffset = 0;

      if (configuration === 'pocketing') {                
          if (interlocks === 'standard') { 
              pocketOffset = interlockStileOffset + 2.192;
          } else { // interlocks === heavy_duty                    
              if ((stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') && numberPanels <= 2) { 
                  pocketOffset = interlockStileOffset + 2.192;
              } else if (stackingDirection === '2-Way' && numberPanels <= 4) {
                  pocketOffset = interlockStileOffset + 2.192;
              } else if (panelStyle === 'nonThermally' && (stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') && numberPanels > 2) {
                  pocketOffset = interlockStileOffset + 2.192 + (numberPanels - 1) * 0.786
              } else if (panelStyle === 'nonThermally' && stackingDirection === '2-Way' && numberPanels > 4) { 
                  pocketOffset = interlockStileOffset + 2.192 + ((numberPanels / 2) - 1) * 0.786
              } else if (panelStyle === 'thermally' && (stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') && numberPanels > 2) { 
                  pocketOffset = interlockStileOffset + 2.192 + (numberPanels - 2) * 0.786
              } else if (panelStyle === 'thermally' && stackingDirection === '2-Way' && numberPanels > 4) { 
                  pocketOffset = interlockStileOffset + 2.192 + ((numberPanels / 2) - 2) * 0.786
              }
          }
      }            
      
      return pocketOffset;
  }

  const calculateBiPartPairOffset = (stackingDirection: any) => {            
      let biPartPairOffset = 0;
      if (stackingDirection === '2-Way') {
          biPartPairOffset = 4.825;
      }

      return biPartPairOffset;
  }

  const calculateTrackCount = (stackingDirection: any, configuration: any, numberPanels: any) => {
      let trackCount = 0;

      if ((stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') && configuration === 'pocketing' && numberPanels === 1) {
          trackCount = 2;
      } else if ((stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right' || stackingDirection === 'Double Active') && numberPanels > 1) {
          trackCount = numberPanels;
      } else if (stackingDirection === '2-Way' && configuration === 'pocketing' && numberPanels === 2) {
          trackCount = 2;
      } else if (stackingDirection === '2-Way' && numberPanels > 2) {
          trackCount = numberPanels / 2;
      }

      return trackCount;
  }

  const calculateFrameDepth = (stackingDirection: any, configuration: any, numberPanels: any) => {
      var trackCount = calculateTrackCount(stackingDirection, configuration, numberPanels);

      return AWNumberUtil.truncate(trackCount * 1.75, 3);
  }

  const calculateIntermediatePanelWidth = (stackingDirection: any, configuration: any, numberPanels: any, railLength: any) => {
      var intermediatePanelWidth = 0;

      if ((stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') && configuration === 'pocketing' && numberPanels >= 2) {
          intermediatePanelWidth = railLength + interlockStileOffset + interlockStileOffset;
      } else if ((stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right' || stackingDirection === 'Double Active') && configuration === 'stacking' && numberPanels >= 3) {
          intermediatePanelWidth = railLength + interlockStileOffset + interlockStileOffset;
      } else if (stackingDirection === '2-Way' && configuration === 'pocketing' && numberPanels >= 4) {
          intermediatePanelWidth = railLength + interlockStileOffset + interlockStileOffset;
      } else if (stackingDirection === '2-Way' && configuration === 'stacking' && numberPanels >= 6) {
          intermediatePanelWidth = railLength + interlockStileOffset + interlockStileOffset;
      }
                  
      return AWNumberUtil.truncate(intermediatePanelWidth, 3);
  }

  const calculateLeadPanelWidth = (railLength: any, lockStileOffset: any, interlockStileOffset: any) => {
      return AWNumberUtil.truncate(railLength + lockStileOffset + interlockStileOffset, 3);
  }

  const calculatePocketDepth = (stackingDirection: any, configuration: any, numberPanels: any, frameDepth: any, interlocks: any) => {
      var pocketDepth = 0;

      if (configuration === 'pocketing') {
          if (stackingDirection === '1-Way Left' || stackingDirection === '1-Way Right') {
              if (numberPanels === 1 && interlocks === 'standard') {
                  pocketDepth = frameDepth + 0.625;
              } else if (numberPanels === 1 && interlocks === 'heavy_duty') {
                  pocketDepth = frameDepth + 0.875;
              } else if (numberPanels > 1 && interlocks === 'standard') {
                  pocketDepth = frameDepth + 2.125;
              } else if (numberPanels > 1 && interlocks === 'heavy_duty') {
                  pocketDepth = frameDepth + 2.375;
              }
          } else if (stackingDirection === '2-Way') {
              if (numberPanels === 2 && interlocks === 'standard') {
                  pocketDepth = frameDepth + 0.625;
              } else if (numberPanels === 2 && interlocks === 'heavy_duty') {
                  pocketDepth = frameDepth + 0.875;
              } else if (numberPanels > 2 && interlocks === 'standard') {
                  pocketDepth = frameDepth + 2.125;
              } else if (numberPanels > 2 && interlocks === 'heavy_duty') {
                  pocketDepth = frameDepth + 2.375;
              }
          }
      }             
      
      return pocketDepth;
  }

  const calculateMaxPanelWidth = (railLength: any, stackingDirection: any, configuration: any, numberPanels: any) => {
      // Return the max value of the following widths
      var leadPanelWidth = calculateLeadPanelWidth(railLength, lockStileOffset, interlockStileOffset);
      var intermediatePanelWidth = calculateIntermediatePanelWidth(stackingDirection, configuration, numberPanels, railLength);
      var stationaryPanelWidth = (stackingDirection != 'Double Active' && configuration === 'stacking') ? AWNumberUtil.truncate(railLength + backStileOffset + interlockStileOffset, 3) : 0;
      var exteriorPanelWidth = stackingDirection === 'Double Active' ? AWNumberUtil.truncate(railLength + lockStileOffset + interlockStileOffset, 3) : 0;

      var maxPanelWidthArray = [leadPanelWidth, intermediatePanelWidth, stationaryPanelWidth, exteriorPanelWidth];
      return AWNumberUtil.truncate(Math.max.apply(Math, maxPanelWidthArray), 3);
  }      

  const getMinHeight = (panelStyle: any, sillOptions: any) => {            
      var minPanelHeight = 32.934;

      if (panelStyle === 'thermally') {
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {                    
              return roundNumber(minPanelHeight + 3.066);
          } else if (sillOptions === 'Tile Track') {                    
              return roundNumber(minPanelHeight + 2.613);
          } else if (sillOptions === 'Low Profile') {                    
              return roundNumber(minPanelHeight + 2.181);
          }
      } else { // nonThermally
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {
              return roundNumber(minPanelHeight + 2.908);
          } else if (sillOptions === 'Tile Track') {
              return roundNumber(minPanelHeight + 2.455);
          } else if (sillOptions === 'Low Profile') {
              return roundNumber(minPanelHeight + 2.023);
          }
      }
  }

  const maxPanelAreaExceeded = (maxPanelWidth: any, panelHeight: any, panelStyle: any) => {
      const panelPerformanceMax = panelStyle === 'thermally' ? 50 : 60;
      return !(((parseFloat(maxPanelWidth) * parseFloat(panelHeight)) / 144 <= panelPerformanceMax) && parseFloat(maxPanelWidth) <= 72);
  }

  const roundNumber = (number: any) => {
      if (!isNaN(+number)) {
          return Number(number.toFixed(3));
      } else {
          return number.toFixed(3);
      }
  }

  const convertToFeetInchesAndFraction = (number: any, roundingDirection: any) => {
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
      if (fraction && fraction !== '0') { // Only add it if we have a value and it isn't 0
          formatted += ' ' + fraction;
      }
      if (inches > 0 || (fraction && fraction !== '0')) { // Add the inch marker if we added inches or fraction
          formatted += '"';
      }

      return formatted;
  }

  const formatNumber = (number: any) => {
      if (!isNaN(+number)) {
          const rounded = AWNumberUtil.roundToEigth(number, AWNumberUtil.roundingDirections.closest);
          // console.log(AWNumberUtil.roundingDirections.closest, rounded)
          const mm = rounded * 25.4;
          const formatted = convertToFeetInchesAndFraction(rounded, AWNumberUtil.roundingDirections.closest);
          return formatted + "<br>" + ' (' + String(mm.toFixed(3)) + 'mm)';
      } else {
          return String(number);
      }
  }

  const widthMaxes = MAX_WIDTH_ARRAY.map(o => {
    var obj = {
      configuration: o[0],
      panelStyle: o[1],
      stackingDirection: o[2],
      maxUnitWidth: o[3],
    };
    return obj
  })

  const onSubmit = (data: CalcForm) => {
    if (msgWidth !== '' || msgHeight !== '') {
      setIsShowResults(false)
      return;
    }
  
    const jsonData = JSON.stringify(data, null, 2);
    const jsonObj = JSON.parse(jsonData);

    const calcUsing = jsonObj.calcUsing;
    const width = widthStates.dimension;
    const height = heightStates.dimension;            
    const numberPanels = parseInt(jsonObj.panelNumber);            
    const sillOptions = jsonObj.sillOption;            
    const stackingDirection = jsonObj.stackingDirection;
    const thicknessFinishedFloor = parseFloat(jsonObj.thicknessFinishedFloorInches) + parseFloat(jsonObj.thicknessFinishedFloorFraction);

    // Width, Height validation
    // let msgHeight = ''
    // if (height > 0) {
    //   if (configuration === 'stacking') {
    //     if (panelStyle === 'thermally') {
    //       if (calcUsing === 'Rough Opening') {
    //         if (height > 120) {
    //           msgHeight = `Please enter a value less than or equal to 10'.`
    //         } else if (height < 3.25) {
    //           msgHeight = `Please enter a value greater than or equal to 3' 1/4".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {

    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (height > 119.375) {
    //           msgHeight = `Please enter a value less than or equal to 9' 11 3/8".`
    //         } else if (height < 35.625) {
    //           msgHeight = `Please enter a value greater than or equal to 2' 11 5/8".`
    //         }
    //       }
    //     } else {
    //       if (calcUsing === 'Rough Opening') {
    //         if (height > 144) {
    //           msgHeight = `Please enter a value less than or equal to  12.`
    //         } else if (height < 24.125) {
    //           msgHeight = `Please enter a value greater than or equal to 3' 1/8.`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (height > 132.375) {
    //           msgHeight = `Please enter a value less than or equal to 11' 11 3/8".`
    //         } else if (height < 35.5) {
    //           msgHeight = `Please enter a value greater than or equal to 2' 11 1/2".`
    //         }
    //       }
    //     }
    //   } else if (configuration === 'pocketing') {
    //     if (panelStyle === 'thermally') {
    //       if (calcUsing === 'Rough Opening') {
    //         if (height > 120) {
    //           msgHeight = `Please enter a value less than or equal to 10'.`
    //         } else if (height < 3.25) {
    //           msgHeight = `Please enter a value greater than or equal to 3' 1/4".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {

    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (height > 119.375) {
    //           msgHeight = `Please enter a value less than or equal to 9' 11 3/8".`
    //         } else if (height < 35.625) {
    //           msgHeight = `Please enter a value greater than or equal to 2' 11 5/8".`
    //         }
    //       }
    //     } else {
    //       if (calcUsing === 'Rough Opening') {
    //         if (height > 144) {
    //           msgHeight = `Please enter a value less than or equal to  to 12'.`
    //         } else if (height < 36.125) {
    //           msgHeight = `Please enter a value greater than or equal to 3' 1/8".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
    //         if (height > 144) {
    //           msgHeight = `Please enter a value less than or equal to  to 12'.`
    //         } else if (height < 36.125) {
    //           msgHeight = `Please enter a value greater than or equal to 3' 1/8".`
    //         }
    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (height > 132.375) {
    //           msgHeight = `Please enter a value less than or equal to 11' 11 3/8".`
    //         } else if (height < 35.5) {
    //           msgHeight = `Please enter a value greater than or equal to 2' 11 1/2".`
    //         }
    //       }
    //     }
    //   }
    // }

    // let msgWidth = '';
    // if (width > 0) {
    //   if (configuration === 'stacking') {
    //     if (panelStyle === 'thermally') {
    //       if (calcUsing === 'Rough Opening') {
    //         if (width > 351.25) {
    //           msgWidth = `Please enter a value less than or equal to 29' 3 1/4".`
    //         } else if (width < 69.75) {
    //           msgWidth = `Please enter a value greater than or equal to 5' 9 7/8".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {

    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (width > 369.625) {
    //           msgWidth = `Please enter a value less than or equal to 29' 2 1/2".`
    //         } else if (width <= 69) {
    //           msgWidth = `Please enter a value greater than or equal to 5' 9 1/8".`
    //         }
    //       }
    //     } else {
    //       if (calcUsing === 'Rough Opening') {
    //         if (width > 489.25) {
    //           msgWidth = `Please enter a value less than or equal to 40' 9 1/4".`
    //         } else if (width < 69.625) {
    //           msgWidth = `Please enter a value greater than or equal to 5' 9 5/8".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (width > 488.5) {
    //           msgWidth = `Please enter a value less than or equal to 40' 8 1/2".`
    //         } else if (width < 153.125) {
    //           msgWidth = `Please enter a value greater than or equal to 12' 9 1/8".`
    //         }
    //       }
    //     }
    //   } else if (configuration === 'pocketing') {
    //     if (panelStyle === 'thermally') {
    //       if (calcUsing === 'Rough Opening') {
    //         if (width > 421.375) {
    //           msgWidth = `Please enter a value less than or equal to 35' 1 3/8".`
    //         } else if (width < 3.25) {
    //           msgWidth = `Please enter a value greater than or equal to 15".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
    //         if (width > 421.375) {
    //           msgWidth = `Please enter a value less than or equal to 35' 1 3/8".`
    //         } else if (width < 136.25) {
    //           msgWidth = `Please enter a value greater than or equal to 11' 3 1/2".`
    //         }
    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (width > 420.625) {
    //           msgWidth = `Please enter a value less than or equal to 35' 5/8".`
    //         } else if (width < 135.5) {
    //           msgWidth = `Please enter a value greater than or equal to 2' 11 5/8".`
    //         }
    //       }
    //     } else {
    //       if (calcUsing === 'Rough Opening') {
    //         if (width > 536.75) {
    //           msgWidth = `Please enter a value less than or equal to  to 44' 8 3/4".`
    //         } else if (width < 180.625) {
    //           msgWidth = `Please enter a value greater than or equal to 15' 5/8".`
    //         }
    //       } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
    //         if (width > 536.75) {
    //           msgWidth = `Please enter a value less than or equal to  to 44' 8 3/4".`
    //         } else if (width < 180.625) {
    //           msgWidth = `Please enter a value greater than or equal to 15' 5/8".`
    //         }
    //       } else if (calcUsing === 'Unit Dimensions') {
    //         if (width > 536) {
    //           msgWidth = `Please enter a value less than or equal to  to 44' 8".`
    //         } else if (width < 155.875) {
    //           msgWidth = `Please enter a value greater than or equal to 14' 11 7/8".`
    //         }
    //       }
    //     }
    //   }
    // }

    // if (msgWidth !== '' || msgHeight !== '') {
    //   setWidthStates({
    //     ...widthStates,
    //     msg: msgWidth
    //   })
    //   setHeightStates({
    //     ...heightStates,
    //     msg: msgHeight
    //   })
    //   setIsShowResults(false)
    //   return;
    // }

    let jambDepth_temp = 0;
    let panelHeight_temp = 0;
    let panelWidth_temp = 0;
    let pocketDepth_temp = 0;
    let pocketWidth_temp = 0;            
    let roughOpeningHeightSubfloor_temp = 0;
    let roughOpeningHeightRecess_temp;            
    let roughOpeningPocketWidth_temp = 0;
    let roughOpeningWidth_temp = 0;            
    let sillDepth_temp = 0;
    let unitWidth_temp = 0;
    let unitHeight_temp = 0;

    // Update Interlocks
    let interlocks_temp = funcSetInterlocks(unitHeight_temp);
    setInterlocks(interlocks_temp);

    // Set variables used in calculations
    const jambWidth_temp = calculateJambWidth(panelStyle, stackingDirection, configuration);
    const lockStileEmbedment_temp = calculateLockStileEmbedment(stackingDirection);
    const pocketOffset_temp = calculatePocketOffset(interlockStileOffset, stackingDirection, configuration, numberPanels, interlocks_temp, panelStyle);
    const biPartPairOffset_temp = calculateBiPartPairOffset(stackingDirection);

    setJambWidth(calculateJambWidth(panelStyle, stackingDirection, configuration));
    setLockStileEmbedment(calculateLockStileEmbedment(stackingDirection));
    setPocketOffset(calculatePocketOffset(interlockStileOffset, stackingDirection, configuration, numberPanels, interlocks_temp, panelStyle));
    setBiPartPairOffset(calculateBiPartPairOffset(stackingDirection));
    setBackStileEmbedment(calculateBackStileEmbedment(panelStyle, stackingDirection, configuration));
    setBackStileOffset(calculateBackStileOffset(panelStyle, stackingDirection, configuration));
    setPocketCount(calculatePocketCount(configuration, stackingDirection));

    switch (calcUsing) {
      case 'Rough Opening':
          roughOpeningWidth_temp = width;                    

          // Rough Opening Height input is from top of subfloor, so calculate real rough opening height and rough opening including recess
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {                        
            roughOpeningHeightRecess_temp = height + 1.5 - thicknessFinishedFloor;
            roughOpeningHeightSubfloor_temp = height;
          } else if (sillOptions === 'Tile Track') {                        
            roughOpeningHeightRecess_temp = height + 1.0 - thicknessFinishedFloor;
            roughOpeningHeightSubfloor_temp = height;
          } else if (sillOptions === 'Low Profile') {                        
            roughOpeningHeightRecess_temp = 'N/A';
            roughOpeningHeightSubfloor_temp = height;
          }                    

          unitHeight_temp = calculateUnitHeightFromRoughOpeningHeight(height);
          unitWidth_temp = calculateUnitWidthFromRoughOpeningWidth(width);

          break;
      case 'Rough Opening Without Pocket (Daylight Width)':
          // Rough Opening Height input is from top of subfloor, so calculate real rough opening height and rough opening including recess
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {
            roughOpeningHeightRecess_temp = height + 1.5 - thicknessFinishedFloor;
              roughOpeningHeightSubfloor_temp = height;
          } else if (sillOptions === 'Tile Track') {
              roughOpeningHeightRecess_temp = height + 1.0 - thicknessFinishedFloor;
              roughOpeningHeightSubfloor_temp = height;
          } else if (sillOptions === 'Low Profile') {
              roughOpeningHeightRecess_temp = 'N/A';
              roughOpeningHeightSubfloor_temp = height;
          }

          var daylightRailLength = calculateDaylightRailLength(width, stackingDirection, lockStileOffset, lockStileEmbedment_temp, jambWidth_temp, numberPanels, interlockPairOffset, biPartPairOffset_temp);
          var leadPanelWidth = calculateLeadPanelWidth(daylightRailLength, lockStileOffset, interlockStileOffset);
          var daylightPocketWidth = calculateDaylightPocketWidth(daylightRailLength, interlockStileOffset, pocketOffset_temp);
          var intermediatePanelWidth = calculateIntermediatePanelWidth(stackingDirection, configuration, numberPanels, daylightRailLength);

          switch (stackingDirection) {
              case "1-Way Left":
              case "1-Way Right":
                  if (numberPanels === 1) {
                      unitWidth_temp = jambWidth_temp - lockStileEmbedment_temp + leadPanelWidth - 2.424 + daylightPocketWidth - 0.375;
                  } else {
                      unitWidth_temp = jambWidth_temp - lockStileEmbedment_temp + leadPanelWidth + ((numberPanels - 1) * intermediatePanelWidth) - (numberPanels * 2.424) + daylightPocketWidth - 0.375;
                  }
                  break;
              case "2-Way":
                  if (numberPanels === 2) {
                      unitWidth_temp = (2 * daylightPocketWidth) + leadPanelWidth - 2.424 + 0.325 - 0.75;
                  } else {
                      unitWidth_temp = (2 * daylightPocketWidth) + ((numberPanels - 2) * intermediatePanelWidth) - (numberPanels * 2.424) + 0.325 - 0.75;
                  }
                  break;
          }

          roughOpeningWidth_temp = calculateRoughOpeningWidthFromUnitWidth(unitWidth_temp);
          unitHeight_temp = calculateUnitHeightFromRoughOpeningHeight(height);

          break;
      case 'Unit Dimensions':                    
          unitWidth_temp = width;
          unitHeight_temp = height;
          
          roughOpeningWidth_temp = calculateRoughOpeningWidthFromUnitWidth(unitWidth_temp);
          const roughOpeningHeight_temp: any = calculateRoughOpeningHeightFromUnitHeight(unitHeight_temp);
          // setRoughOpeningHeight(roughOpeningHeight_temp);
                                      
          // Rough Opening Height input is from top of subfloor, so calculate real rough opening height and rough opening including recess
          if (sillOptions === 'Standard On-Floor Drainage' || sillOptions === 'None') {                        
              roughOpeningHeightRecess_temp = roughOpeningHeight_temp + 1.5 - thicknessFinishedFloor;
              roughOpeningHeightSubfloor_temp = roughOpeningHeight_temp;
          } else if (sillOptions === 'Tile Track') {                        
              roughOpeningHeightRecess_temp = roughOpeningHeight_temp + 1.0 - thicknessFinishedFloor;
              roughOpeningHeightSubfloor_temp = roughOpeningHeight_temp;
          } else if (sillOptions === 'Low Profile') {                        
              roughOpeningHeightRecess_temp = 'N/A';
              roughOpeningHeightSubfloor_temp = roughOpeningHeight_temp;
          }
          break;
    }

    //RailLength
    const railLength = calcUsing === 'Rough Opening Without Pocket (Daylight Width)' ?
      calculateDaylightRailLength(width, stackingDirection, lockStileOffset, lockStileEmbedment_temp, jambWidth_temp, numberPanels, interlockPairOffset, biPartPairOffset_temp) :
      calculateRailLength(stackingDirection, configuration, unitWidth_temp, numberPanels);

    // Use max panel width value
    panelWidth_temp = calculateMaxPanelWidth(railLength, stackingDirection, configuration, numberPanels);

    // Panel Height
    panelHeight_temp = calculatePanelHeightFromUnitHeight(unitHeight_temp, panelStyle, sillOptions);

    // Jamb Depth (same as frame depth on the spreadsheet)
    jambDepth_temp = calculateFrameDepth(stackingDirection, configuration, numberPanels);
    sillDepth_temp = jambDepth_temp;

    // Pocket Width
    pocketWidth_temp = (configuration === 'pocketing') ? railLength + interlockStileOffset + pocketOffset_temp + 0.375 : 0;

    // BMC TODO
    roughOpeningPocketWidth_temp = roughOpeningWidth_temp - pocketWidth_temp;

    // Pocket Depth
    pocketDepth_temp = calculatePocketDepth(stackingDirection, configuration, numberPanels, jambDepth_temp, interlocks_temp);            

    const maxPanelWidth = calculateMaxPanelWidth(railLength, stackingDirection, configuration, numberPanels);    

    if (maxPanelAreaExceeded(maxPanelWidth, panelHeight_temp, panelStyle)) {
      
    } else {
      // Results
      setJambDepth(formatNumber(jambDepth_temp));
      setPanelHeight(formatNumber(panelHeight_temp));
      setPanelWidth(formatNumber(panelWidth_temp));
      setPocketDepth(formatNumber(pocketDepth_temp));
      setPocketWidth(formatNumber(pocketWidth_temp));
      setRoughOpeningHeightSubfloor(formatNumber(roughOpeningHeightSubfloor_temp));
      setRoughOpeningHeightRecess(formatNumber(roughOpeningHeightRecess_temp));
      setRoughOpeningWidth(formatNumber(roughOpeningWidth_temp));
      setRoughOpeningPocketWidth(formatNumber(roughOpeningPocketWidth_temp));
      setSillDepth(formatNumber(sillDepth_temp));
      setUnitHeight(formatNumber(unitHeight_temp));
      setUnitWidth(formatNumber(unitWidth_temp));
    }

    setIsShowResults(true);
    
    props.lastStep();
    props.completeCallback();
  };

  const onDimensionFieldChange = (e: any, type: any) => {
    if (type === 'width') {
      const feet = e.target.name === 'width' ? e.target.value : getValues('width').trim();
      const inches = e.target.name === 'widthInches' ? e.target.value : getValues('widthInches');
      const fraction = e.target.name === 'widthFraction' ? e.target.value : getValues('widthFraction');
    
      if (parseFloat(feet) > 0 || parseFloat(inches) !== 0 || parseFloat(fraction) !== 0) {
        const length = parseFloat(feet) * 12 + parseFloat(inches) + parseFloat(fraction);
        const states = {
          feet: parseFloat(feet),
          inches: parseFloat(inches),
          fraction: parseFloat(fraction),
          dimension: length
        }

        setWidthStates({
          ...widthStates,
          ...states
        })

        updateForm(e, states);
      }
    } else if (type === 'height') {
      const feet = e.target.name === 'height' ? e.target.value : getValues('height').trim();
      const inches = e.target.name === 'heightInches' ? e.target.value : getValues('heightInches');
      const fraction = e.target.name === 'heightFraction' ? e.target.value : getValues('heightFraction');
        
      if (parseFloat(feet) || inches !== '0' || fraction !== '0') {
        const length = parseFloat(feet) * 12 + parseFloat(inches) + parseFloat(fraction);
        const states = {
          feet: parseFloat(feet),
          inches: parseFloat(inches),
          fraction: parseFloat(fraction),
          dimension: length
        }

        setHeightStates({
          ...heightStates,
          ...states
        })

        updateForm(e, states);
      }
    }
  } 

  const updateForm = (e?: any, dimensionStates?: any) => {
    setIsShowResults(false);
    setMsgWidth('');
    setMsgHeight('');

    if (e?.target?.name !== 'width' && e?.target?.name !== 'height') {
      setFormState({...formState, [e.target.name]: e.target.value })
    }

    const height = e?.target?.name && e?.target?.name?.includes('height') ? dimensionStates?.dimension : heightStates.dimension;       
    const width = e?.target?.name && e?.target?.name?.includes('width') ? dimensionStates.dimension : widthStates.dimension;
    const calcUsing = e?.target?.name === 'calcUsing' ? e?.target?.value : getValues('calcUsing');
    const numberPanels = e?.target?.name === 'panelNumber' ? e?.target?.value : parseInt(getValues('panelNumber'));
    const sillOptions = e?.target?.name === 'sillOption' ? e?.target?.value : getValues('sillOption');
    const stackingDirection = e?.target?.name === 'stackingDirection' ? e?.target?.value : getValues('stackingDirection');

    // Width, Height validation
    let msgHeight = ''
    if (height > 0) {
      if (configuration === 'stacking') {
        if (panelStyle === 'thermally') {
          if (calcUsing === 'Rough Opening') {
            if (height > 120) {
              msgHeight = `Please enter a value less than or equal to 10'.`
            } else if (height < 36.25) {
              msgHeight = `Please enter a value greater than or equal to 3' 1/4".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {

          } else if (calcUsing === 'Unit Dimensions') {
            if (height > 119.375) {
              msgHeight = `Please enter a value less than or equal to 9' 11 3/8".`
            } else if (height < 35.625) {
              msgHeight = `Please enter a value greater than or equal to 2' 11 5/8".`
            }
          }
        } else {
          if (calcUsing === 'Rough Opening') {
            if (height > 144) {
              msgHeight = `Please enter a value less than or equal to  12.`
            } else if (height < 24.125) {
              msgHeight = `Please enter a value greater than or equal to 3' 1/8.`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
          } else if (calcUsing === 'Unit Dimensions') {
            if (height > 132.375) {
              msgHeight = `Please enter a value less than or equal to 11' 11 3/8".`
            } else if (height < 35.5) {
              msgHeight = `Please enter a value greater than or equal to 2' 11 1/2".`
            }
          }
        }
      } else if (configuration === 'pocketing') {
        if (panelStyle === 'thermally') {
          if (calcUsing === 'Rough Opening') {
            if (height > 120) {
              msgHeight = `Please enter a value less than or equal to 10'.`
            } else if (height < 36.25) {
              msgHeight = `Please enter a value greater than or equal to 3' 1/4".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {

          } else if (calcUsing === 'Unit Dimensions') {
            if (height > 119.375) {
              msgHeight = `Please enter a value less than or equal to 9' 11 3/8".`
            } else if (height < 35.625) {
              msgHeight = `Please enter a value greater than or equal to 2' 11 5/8".`
            }
          }
        } else {
          if (calcUsing === 'Rough Opening') {
            if (height > 144) {
              msgHeight = `Please enter a value less than or equal to  to 12'.`
            } else if (height < 36.125) {
              msgHeight = `Please enter a value greater than or equal to 3' 1/8".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
            if (height > 144) {
              msgHeight = `Please enter a value less than or equal to  to 12'.`
            } else if (height < 36.125) {
              msgHeight = `Please enter a value greater than or equal to 3' 1/8".`
            }
          } else if (calcUsing === 'Unit Dimensions') {
            if (height > 132.375) {
              msgHeight = `Please enter a value less than or equal to 11' 11 3/8".`
            } else if (height < 35.5) {
              msgHeight = `Please enter a value greater than or equal to 2' 11 1/2".`
            }
          }
        }
      }
    }

    let msgWidth = '';
    if (width > 0) {
      if (configuration === 'stacking') {
        if (panelStyle === 'thermally') {
          if (calcUsing === 'Rough Opening') {
            if (width > 351.25) {
              msgWidth = `Please enter a value less than or equal to 29' 3 1/4".`
            } else if (width < 69.75) {
              msgWidth = `Please enter a value greater than or equal to 5' 9 7/8".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {

          } else if (calcUsing === 'Unit Dimensions') {
            if (width > 369.625) {
              msgWidth = `Please enter a value less than or equal to 29' 2 1/2".`
            } else if (width <= 69) {
              msgWidth = `Please enter a value greater than or equal to 5' 9 1/8".`
            }
          }
        } else {
          if (calcUsing === 'Rough Opening') {
            if (width > 489.25) {
              msgWidth = `Please enter a value less than or equal to 40' 9 1/4".`
            } else if (width < 69.625) {
              msgWidth = `Please enter a value greater than or equal to 5' 9 5/8".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
          } else if (calcUsing === 'Unit Dimensions') {
            if (width > 488.5) {
              msgWidth = `Please enter a value less than or equal to 40' 8 1/2".`
            } else if (width < 153.125) {
              msgWidth = `Please enter a value greater than or equal to 12' 9 1/8".`
            }
          }
        }
      } else if (configuration === 'pocketing') {
        if (panelStyle === 'thermally') {
          if (calcUsing === 'Rough Opening') {
            if (width > 421.375) {
              msgWidth = `Please enter a value less than or equal to 35' 1 3/8".`
            } else if (width < 3.25) {
              msgWidth = `Please enter a value greater than or equal to 15".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
            if (width > 421.375) {
              msgWidth = `Please enter a value less than or equal to 35' 1 3/8".`
            } else if (width < 136.25) {
              msgWidth = `Please enter a value greater than or equal to 11' 3 1/2".`
            }
          } else if (calcUsing === 'Unit Dimensions') {
            if (width > 420.625) {
              msgWidth = `Please enter a value less than or equal to 35' 5/8".`
            } else if (width < 135.5) {
              msgWidth = `Please enter a value greater than or equal to 2' 11 5/8".`
            }
          }
        } else {
          if (calcUsing === 'Rough Opening') {
            if (width > 536.75) {
              msgWidth = `Please enter a value less than or equal to  to 44' 8 3/4".`
            } else if (width < 180.625) {
              msgWidth = `Please enter a value greater than or equal to 15' 5/8".`
            }
          } else if (calcUsing === 'Rough Opening Without Pocket (Daylight Width)') {
            if (width > 536.75) {
              msgWidth = `Please enter a value less than or equal to  to 44' 8 3/4".`
            } else if (width < 180.625) {
              msgWidth = `Please enter a value greater than or equal to 15' 5/8".`
            }
          } else if (calcUsing === 'Unit Dimensions') {
            if (width > 536) {
              msgWidth = `Please enter a value less than or equal to  to 44' 8".`
            } else if (width < 155.875) {
              msgWidth = `Please enter a value greater than or equal to 14' 11 7/8".`
            }
          }
        }
      }
    }

    if (msgWidth !== '' || msgHeight !== '') {
      setMsgWidth(msgWidth)
      setMsgHeight(msgHeight)
      setIsShowResults(false)
    }
  
    // Update Interlocks	    
    let interlocks_temp;        
    if (calcUsing == 'Rough Opening' || calcUsing == 'Rough Opening Without Pocket (Daylight Width)') {
      interlocks_temp = funcSetInterlocks(calculateUnitHeightFromRoughOpeningHeight(height));
    } else { // unit_dimensions
      interlocks_temp = funcSetInterlocks(height);
    }
    setInterlocks(interlocks_temp)

    // Set variables used in calculations
    setJambWidth(calculateJambWidth(panelStyle, stackingDirection, configuration));
    setLockStileEmbedment(calculateLockStileEmbedment(stackingDirection));
    setBackStileEmbedment(calculateBackStileEmbedment(panelStyle, stackingDirection, configuration));
    setBackStileOffset(calculateBackStileOffset(panelStyle, stackingDirection, configuration));
    setPocketOffset(calculatePocketOffset(interlockStileOffset, stackingDirection, configuration, numberPanels, interlocks_temp, panelStyle));
    setBiPartPairOffset(calculateBiPartPairOffset(stackingDirection));

    //////////////////////////////
    ///// Min/Max Height
    //////////////////////////////            
    // let minHeight_temp = getMinHeight(panelStyle, sillOptions);            
    // let maxHeight_temp = panelStyle === 'thermally' ? 119.375 : 143.375;

    // switch (calcUsing) {
    //     case 'Rough Opening':
    //     case 'Rough Opening Without Pocket (Daylight Width)':
    //       minHeight_temp = calculateRoughOpeningHeightFromUnitHeight(minHeight_temp);
    //       maxHeight_temp = calculateRoughOpeningHeightFromUnitHeight(maxHeight_temp);
    //       break;
    //     case 'Unit Dimensions':
    //         // min/max are defined in unit dimensions
    //       break;
    // }

    // const minFormattedHeight = convertToFeetInchesAndFraction(minHeight_temp, AWNumberUtil.roundingDirections.up);
    // const maxFormattedHeight = convertToFeetInchesAndFraction(maxHeight_temp, AWNumberUtil.roundingDirections.down);

    // setHeightStates({
    //   ...heightStates,
    //   ruleMax: roundNumber(maxHeight_temp),
    //   ruleMin: roundNumber(minHeight_temp),
    //   msgMax: 'Please enter a value less than or equal to ' + minFormattedHeight + '.',
    //   msgMin: 'Please enter a value greater than or equal to ' + maxFormattedHeight + '.'
    // })

    // Update the validator message on the page
    

    //////////////////////////////
    ///// Min/Max Width
    //////////////////////////////             
    // let minWidth_temp = calculateMinWidth(stackingDirection, configuration, numberPanels, calcUsing, '');
  
    // // Get the Max Width from the array
    // const maxWidthRow = widthMaxes.filter((element: any) => 
    //   element.configuration === configuration && element.panelStyle === panelStyle && element.stackingDirection === stackingDirection
    // );
  
    // let maxWidth_temp = maxWidthRow[0].maxUnitWidth;

    // switch (calcUsing) {
    //     case 'Rough Opening':
    //     case 'Rough Opening Without Pocket (Daylight Width)':
    //       minWidth_temp = calculateRoughOpeningWidthFromUnitWidth(minWidth_temp);
    //       maxWidth_temp = calculateRoughOpeningWidthFromUnitWidth(maxWidth_temp);
    //         break;
    //     case 'Unit Dimensions':
    //         // min/max are defined in unit dimensions
    //         break;
    // }

    // const minFormattedWidth = convertToFeetInchesAndFraction(minWidth_temp, AWNumberUtil.roundingDirections.up);
    // const maxFormattedWidth = convertToFeetInchesAndFraction(maxWidth_temp, AWNumberUtil.roundingDirections.down);

    // setWidthStates({
    //   ...widthStates,
    //   ruleMax: roundNumber(maxWidth_temp),
    //   ruleMin: roundNumber(minWidth_temp),
    //   msgMax: 'Please enter a value less than or equal to ' + maxFormattedWidth + '.',
    //   msgMin: 'Please enter a value greater than or equal to ' + minFormattedWidth + '.'
    // })

    ////////////////////////////////////////
    ///// Update number of panels dropdown
    //////////////////////////////////////// 
    let minPanelNumber_temp;
    let maxPanelNumber_temp;
    const pocketCount = calculatePocketCount(configuration, stackingDirection);
    setPocketCount(pocketCount);
    if (msgWidth === '') {
      const minPanelValue = pocketCount > 0 ? 1 : 2;
      minPanelNumber_temp = stackingDirection === '2-Way' ? minPanelValue * 2 : minPanelValue;

      const maxPanelValue = stackingDirection === '2-Way' ? 2 : 1;
      maxPanelNumber_temp = panelStyle === 'thermally' ? maxPanelValue * 5 : maxPanelValue * 7;

      let i = minPanelNumber_temp;
      const numberPanelData: any = [];
      let railLength = calculateRailLength(stackingDirection, configuration, width, i);
      let maxPanelWidth = calculateMaxPanelWidth(railLength, stackingDirection, configuration, i);
 
      // Only show number of panels with a maxPanelWidth <= than 72
      while (maxPanelWidth > 72) {
          i = stackingDirection === '2-Way' ? i += 2 : i += 1;

          railLength = calculateRailLength(stackingDirection, configuration, width, i);
          maxPanelWidth = calculateMaxPanelWidth(railLength, stackingDirection, configuration, i);
      }

      
      // Add the smallest number of panels where maxPanelWidth is less than 72
      numberPanelData.push(i);

      // Now add the rest of the options up to the max panel number
      while (i < maxPanelNumber_temp) {
          if (stackingDirection === '2-Way') {
              numberPanelData.push(i + 2);
          } else {
              numberPanelData.push(i + 1);
          }

          i = stackingDirection == '2-Way' ? i += 2 : i += 1;
      }

      setNumberPanels(numberPanelData)
    }          
  }

  if (!fields) {
    return <></>;
  }

  return (
    <div>
      <div className='font-bold'>
        {fields?.StepThreeTitle?.value}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-12 mt-5">
        <div className={themeData.classes.formWrapper}>
          <div className={themeData.classes.columnSpan2}>
            <label className={themeData.classes.labelClass} htmlFor="calcUsing">
              Calculate using known
            </label>
            <select
              className={themeData.classes.selectColumnSpan2}
              {...register('calcUsing')}
              name='calcUsing'
              onChange={updateForm}
            >
              {configuration === 'stacking' && (
                <>
                <option value="Rough Opening" selected>Rough Opening</option>
                <option value="Unit Dimensions">Unit Dimensions</option>
                </>
              )}
              {configuration === 'pocketing' && (
                <>
                <option value="Rough Opening" selected>Rough Opening</option>
                <option value="Rough Opening Without Pocket (Daylight Width)">Rough Opening Without Pocket (Daylight Width)</option>
                <option value="Unit Dimensions">Unit Dimensions</option>
                </>
              )}
            </select>
          </div>
          <div className={themeData.classes.columnSpan1}>
            <label className={themeData.classes.labelClass} htmlFor="width">
              Width (in inches)*
            </label>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-3'>
                <input
                  type="text"
                  placeholder="Width"
                  maxLength={25}
                  onInput={clearCalculations}
                  className={`${
                    (errors.width || msgWidth) ? themeData.classes.errorInvalid : themeData.classes.errorValid
                  }`}
                  {...register('width', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]*\.[0-9]*[1-9][0-9]*)$/,
                      message: 'Width is not valid.',
                    },
                  })}
                  name='width'
                  onChange={(e) => onDimensionFieldChange(e, 'width')}
                ></input>
              </div>
              <div>
                <select
                  className={msgWidth ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1}
                  {...register('widthInches')}
                  name='widthInches'
                  onChange={(e) => onDimensionFieldChange(e, 'width')}
                >
                  <option value="0" selected>0</option>
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
                  className={msgWidth ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1}
                  {...register('widthFraction')}
                  name='widthFraction'
                  onChange={(e) => onDimensionFieldChange(e, 'width')}
                >
                  <option value="0" selected>0</option>
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
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-3'>
                <input
                  type="text"
                  placeholder="Height"
                  maxLength={25}
                  onInput={clearCalculations}
                  className={`${
                    (errors.height || msgHeight) ? themeData.classes.errorInvalid : themeData.classes.errorValid
                  }`}
                  {...register('height', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]*\.[0-9]*[1-9][0-9]*)$/,
                      message: 'Height is not valid.',
                    },
                  })}
                  name='height'
                  onChange={(e) => onDimensionFieldChange(e, 'height')}
                ></input>
              </div>
              <div>
                <select
                  className={msgHeight ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1}
                  {...register('heightInches')}
                  name='heightInches'
                  onChange={(e) => onDimensionFieldChange(e, 'height')}
                >
                  <option value="0" selected>0</option>
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
                  className={msgHeight ? themeData.classes.errorInvalid : themeData.classes.selectColumnSpan1}
                  {...register('heightFraction')}
                  name='heightFraction'
                  onChange={(e) => onDimensionFieldChange(e, 'height')}
                >
                  <option value="0" selected>0</option>
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
              name='stackingDirection'
              onChange={updateForm}
            >
              {configuration === 'stacking' && (
                <>
                <option value="1-Way Left" selected>1-Way Left</option>
                <option value="1-Way Right">1-Way Right</option>
                <option value="2-Way">2-Way</option>
                <option value="Double Active">Double Active</option>
                </>
              )}
              {configuration === 'pocketing' && (
                <>
                <option value="1-Way Left" selected>1-Way Left</option>
                <option value="1-Way Right">1-Way Right</option>
                <option value="2-Way">2-Way</option>
                </>
              )}
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
              name='sillOption'
              onChange={updateForm}
            >
              <option value="Standard On-Floor Drainage" selected>Standard On-Floor Drainage</option>
              <option value="Tile Track">Tile Track</option>
              <option value="Low Profile">Low Profile</option>
              <option value="None">None</option>
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
              name='panelNumber'
              onChange={updateForm}
            >
              {numberPanels.map(numberPanel => (
                <option key={numberPanel} value={numberPanel}>{numberPanel}</option>
              ))}
            </select>
            {errors.panelNumber && (
              <div className="text-body text-error">{errors.panelNumber.message}</div>
            )}
          </div>
          <div></div>
          {configuration === 'stacking' && (
            <div className={themeData.classes.columnSpan1}>
              <label className={themeData.classes.labelClass} htmlFor="panelStackingLocation">
                Panel Stacking Location*
              </label>
              <select
                className={themeData.classes.selectColumnSpan1}
                {...register('panelStackingLocation')}
                name='panelStackingLocation'
                onChange={updateForm}
              >
                <option value="Interior" selected>Interior</option>
                <option value="Exterior">Exterior</option>
              </select>
              {errors.panelStackingLocation && (
                <div className="text-body text-error">{errors.panelStackingLocation.message}</div>
              )}
            </div>
          )}
          {(formState.sillOption === 'Tile Track') && (
            <div className={themeData.classes.columnSpan1}>
              <label className={themeData.classes.labelClass} htmlFor="thicknessFinishedFloor">
                Thickness Of Finished Floor (In Inches)*
              </label>
              <div className='grid grid-cols-4 gap-4'>
                <select
                  className={themeData.classes.selectColumnSpan1}
                  {...register('thicknessFinishedFloorInches')}
                  name='thicknessFinishedFloorInches'
                  onChange={updateForm}
                  // onChange={(e) => onDimensionFieldChange(e, 'height')}
                >
                  <option value="0" selected>0</option>
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
                  name='thicknessFinishedFloorFraction'
                  onChange={updateForm}
                >
                  <option value="0" selected>0</option>
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
          {/* Submit section */}
          <div className={themeData.classes.submitWrapper}>
            {isShowResults && (
              <button type='button' className={themeData.classes.prevButton} onClick={() => {
                props.previousStep();
                setIsShowResults(false);
              }}>
                <FiArrowLeft size={16} />
                <span className='ml-2'>{fields?.PreviousButtonText?.value}</span>
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
        <div className='mt-4'>
          <div className="col-span-12 flex flex-row items-center justify-between">
            <div className="mb-s font-sans text-sm-m font-heavy text-theme-text last:mb-0 lg:text-m">
              <h1>Results:</h1>
            </div>
            <div className="mb-s hidden items-end pr-2 md:relative md:block">
              <button type="button" className={themeData.classes.printButton} onClick={printResults}>
                <span className="mr-xxs text-darkprimary">
                  <SvgIcon icon="print" />
                </span>
                Print
              </button>
            </div>
          </div>
          <div className={themeData.classes.resultsOutputWrapper} id="resultsOutput">
            <div className={themeData.classes.columnSpan1}>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <div className="hidden print:block">E-Series Sizing Calculator Results</div>
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
                          <td className={themeData.classes.tdColumnCenter}>{formData?.selectedConfigurationOption || '-'}</td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Stacking Direction</td>
                          <td className={themeData.classes.tdColumnCenter}>{getValues('stackingDirection') || '-'}</td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Panel Style</td>
                          <td className={themeData.classes.tdColumnCenter}>{formData?.selectedPanelStyle || '-'}</td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Panel Stacking Location</td>
                          <td className={themeData.classes.tdColumnCenter}>{getValues('panelStackingLocation' || '-')}</td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}># Of Pannels</td>
                          <td className={themeData.classes.tdColumnCenter}>{getValues('panelNumber') || '-'}</td>
                        </tr>
                        {formState.sillOption !== 'Tile Track' && (
                          <tr className={themeData.classes.tableRow}>
                            <td className={themeData.classes.tdColumn}>Sill Options</td>
                            <td className={themeData.classes.tdColumnCenter}>{getValues('sillOption') || '-'}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className={themeData.classes.columnSpan1}>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    {/* Calculated Dimensions Table */}
                    <table className="min-w-full font-sans text-sm font-light ">
                      <thead className={themeData.classes.tableHead}>
                        <tr>
                          <th scope="col" className={themeData.classes.thLeft}>
                            Calculated Dimensions
                          </th>
                          <th scope="col" className={themeData.classes.thCenter}>
                            Width
                          </th>
                          <th scope="col" className={themeData.classes.thRight}>
                            Height
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Rough Opening (from top of finished floor)</td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: roughOpeningWidth}} />
                          </td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: roughOpeningHeightSubfloor}} />
                          </td>
                        </tr>
                        {formState.sillOption === 'Tile Track' && (
                          <tr className={themeData.classes.tableRow}>
                            <th className={themeData.classes.tdColumn}>Rough Opening (including recess in floor with flush sill application)</th>
                            <td className={themeData.classes.tdColumn}>
                              <div dangerouslySetInnerHTML={{__html: roughOpeningWidth}} />
                            </td>
                            <td className={themeData.classes.tdColumn}>
                              <div dangerouslySetInnerHTML={{__html: roughOpeningHeightRecess}} />
                            </td>
                          </tr>
                        )}
                        {configuration === 'pocketing' && (
                          <tr className={themeData.classes.tableRow}>
                            <td className={themeData.classes.tdColumn}>Rough Opening (not including pocket)</td>
                            <td className={themeData.classes.tdColumn}>
                              <div dangerouslySetInnerHTML={{__html: roughOpeningPocketWidth}} />
                            </td>
                            <td className={themeData.classes.tdColumn}>
                              -
                            </td>
                          </tr>
                        )}
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Unit Size</td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: unitWidth}} />
                          </td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: unitHeight}} />
                          </td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Panel Size</td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: panelWidth}} />
                          </td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: panelHeight}} />
                          </td>
                        </tr>
                        {configuration === 'pocketing' && (
                          <tr className={themeData.classes.tableRow}>
                            <td className={themeData.classes.tdColumn}>Pocket Width</td>
                            <td className={themeData.classes.tdColumn}>
                              <div dangerouslySetInnerHTML={{__html: pocketWidth}} />
                            </td>
                            <td className={themeData.classes.tdColumn}>{'-'}</td>
                          </tr>
                        )}
                        {configuration === 'pocketing' && (
                          <tr className={themeData.classes.tableRow}>
                            <td className={themeData.classes.tdColumn}>Pocket Depth</td>
                            <td className={themeData.classes.tdColumn}>
                              <div dangerouslySetInnerHTML={{__html: pocketDepth}} />
                            </td>
                            <td className={themeData.classes.tdColumn}>{'-'}</td>
                          </tr>
                        )}
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Jamb Depth</td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: jambDepth}} />
                          </td>
                          <td className={themeData.classes.tdColumn}>{'-'}</td>
                        </tr>
                        <tr className={themeData.classes.tableRow}>
                          <td className={themeData.classes.tdColumn}>Sill Depth</td>
                          <td className={themeData.classes.tdColumn}>
                            <div dangerouslySetInnerHTML={{__html: sillDepth}} />
                          </td>
                          <td className={themeData.classes.tdColumn}>{'-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between p-4 border border-black mt-5'>
            <div className='font-bold text-[20px]'>Preparing for installation?</div>
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
