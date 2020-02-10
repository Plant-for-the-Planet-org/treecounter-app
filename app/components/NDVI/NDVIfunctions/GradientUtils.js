const colorStops = [
  {
    percentage: 0,
    color: [0, 67, 124]
  },
  {
    percentage: 40,
    color: [40, 1, 250]
  },
  {
    percentage: 50,
    color: [250, 67, 31]
  },
  {
    percentage: 55,
    color: [251, 247, 0]
  },
  {
    percentage: 67,
    color: [117, 199, 0]
  },
  {
    percentage: 86,
    color: [4, 196, 0]
  },
  {
    percentage: 100,
    color: [4, 159, 4]
  }
];

export const getPointPercentageOnGradient = (point = 0) => {
  let percentage = 50;
  if (point > 0) {
    percentage = point * 100 / 2 + 50;
  } else {
    percentage = 100 - (Math.abs(point) * 100 / 2 + 50);
  }
  return percentage;
};

export const getColorForNDVI = (point, gradientWidth = 350) => {
  if (!point) {
    return `rgb(142, 142, 142)`;
  }
  if (point > 1) {
    point = 1;
  }
  if (point < -1) {
    point = -1;
  }
  let percentage = getPointPercentageOnGradient(point);
  let i;
  for (i = 0; i < colorStops.length; i++) {
    if (colorStops[i].percentage > percentage) {
      break;
    }
  }

  let lowerIndex = i == 1 ? 0 : i - 1;
  let upperIndex = lowerIndex + 1;
  let percentageWidth = percentage / 100 * gradientWidth;
  let value = (percentageWidth / (gradientWidth / (colorStops.length - 1))) % 1;

  // debug(colorStops.length, lowerIndex, upperIndex, point);
  let color = getStepColor(
    colorStops[lowerIndex].color,
    colorStops[upperIndex].color,
    value
  );
  // debug(color);
  return `rgb(${color.join(',')})`;
};

export const getStepColor = (colorA, colorB, value) => {
  return colorA.map(function(color, i) {
    return (color + value * (colorB[i] - color)) & 255;
  });
};
