import getGradiantPosition from './getGradientPosition';

const getMetricsForDisplayingGradientLineHighlight = (min, max) => {
  const gradientLinePercentagePerFraction = 100 / 21;
  const minPosition = getGradiantPosition(min); // find the min position in gradient
  const maxPosition = getGradiantPosition(max); // find the max position in gradient
  const intervalFromMinToMax = maxPosition - minPosition + 1; // find the interval including the last last step

  const calculateLeftInPercentage =
    minPosition * gradientLinePercentagePerFraction;
  const calculateWidthInPercentage =
    intervalFromMinToMax * gradientLinePercentagePerFraction;
  return [calculateLeftInPercentage + '%', calculateWidthInPercentage + '%'];
};

export default getMetricsForDisplayingGradientLineHighlight;
