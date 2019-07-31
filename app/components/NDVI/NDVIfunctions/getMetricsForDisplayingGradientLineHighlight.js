import getGradiantPosition from './getGradientPosition';

const getMetricsForDisplayingGradientLineHighlight = (min, max) => {
  const gradientLineWidthPerFraction = 312 / 21; //gradientLine width at all
  const minPosition = getGradiantPosition(min); // find the min position in gradient
  const maxPosition = getGradiantPosition(max); // find the max position in gradient
  const intervalFromMinToMax = maxPosition - minPosition + 1; // find the interval including the last last step
  const calculatedLeftMargin = minPosition * gradientLineWidthPerFraction;
  const calculatedWidth = intervalFromMinToMax * gradientLineWidthPerFraction;

  return [calculatedLeftMargin, calculatedWidth];
};

export default getMetricsForDisplayingGradientLineHighlight;
