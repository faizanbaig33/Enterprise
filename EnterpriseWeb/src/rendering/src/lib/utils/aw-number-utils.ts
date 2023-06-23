function extend() {
  for (let i = 1; i < arguments.length; i++)
    for (const key in arguments[i])
      if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];
  return arguments[0];
}

export const fractions = {
  eigths: [
    { decimal: 0, fraction: '0' },
    { decimal: 0.125, fraction: '1/8' },
    { decimal: 0.25, fraction: '1/4' },
    { decimal: 0.375, fraction: '3/8' },
    { decimal: 0.5, fraction: '1/2' },
    { decimal: 0.625, fraction: '5/8' },
    { decimal: 0.75, fraction: '3/4' },
    { decimal: 0.875, fraction: '7/8' },
    { decimal: 1, fraction: '1' },
  ],
};

export const roundingDirections = {
  closest: 0,
  down: -1,
  up: 1,
};

const optionDefaults = {
  decimalToEigth: {
    roundingDirection: roundingDirections.closest,
  },
  roundToEigth: {
    roundingDirection: roundingDirections.closest,
  },
};

export const decimalToEigth = (number: any, options: any) => {
  const decimal = number - Math.floor(number);

  options = {
    ...optionDefaults.decimalToEigth,
    ...options,
  };

  let eigths = fractions.eigths;
  if (options.roundingDirection === roundingDirections.up) {
    eigths = eigths.filter((element) => element.decimal >= decimal);
  } else if (options.roundingDirection === roundingDirections.down) {
    eigths = eigths.filter((element) => element.decimal <= decimal);
  }

  const sorted = eigths.sort(function (a, b) {
    const differenceA = Math.abs(decimal - a.decimal);
    const differenceB = Math.abs(decimal - b.decimal);
    return differenceA - differenceB;
  });

  return sorted[0].fraction;
};

export const roundToEigth = (number: any, options: any) => {
  const whole = Math.floor(number);
  const decimal = number - whole;

  options = {
    ...optionDefaults.decimalToEigth,
    ...options,
  };

  let eigths = fractions.eigths;
  if (options.roundingDirection === roundingDirections.up) {
    eigths = eigths.filter((element) => element.decimal >= decimal);
  } else if (options.roundingDirection === roundingDirections.down) {
    eigths = eigths.filter((element) => element.decimal <= decimal);
  }

  const sorted = eigths.sort(function (a, b) {
    const differenceA = Math.abs(decimal - a.decimal);
    const differenceB = Math.abs(decimal - b.decimal);
    return differenceA - differenceB;
  });

  return whole + sorted[0].decimal;
};

export const truncate = (number: any, digits: any) => {
  const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
    m = number.toString().match(re);
  return m ? parseFloat(m[1]) : number.valueOf();
};
