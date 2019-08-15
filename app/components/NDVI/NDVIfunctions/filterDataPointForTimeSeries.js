import _ from 'lodash';

const filterDataPoints = dataPoints => {
  const yearVariations = findYearVariations(dataPoints);
  return fillDataPointsDependsOnYearVariations(yearVariations, dataPoints);
};

const findYearVariations = dataPoints => {
  let yearVariations = {};
  dataPoints.map(dataPoint => {
    yearVariations = _.merge({}, yearVariations, {
      [dataPoint.year]: { year: dataPoint.year, dataPoints: [] }
    });
  });

  return _.toArray(yearVariations);
};

const fillDataPointsDependsOnYearVariations = (yearVariations, dataPoints) => {
  let tempArr = [];
  yearVariations.forEach(yearVariation => {
    let monthsAsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const dataPointsFound = _.filter(
      dataPoints,
      _.matches({ year: yearVariation.year })
    );

    for (let i = 0; i < monthsAsNumbers.length; i++) {
      const index = _.findIndex(dataPointsFound, function(o) {
        return o.month == monthsAsNumbers[i];
      });
      if (index != -1) {
        monthsAsNumbers[i] = dataPointsFound[index];
      } else {
        monthsAsNumbers[i] = {};
      }
    }

    yearVariation.dataPoints = monthsAsNumbers;
    tempArr.push(yearVariation);
  });

  return _.orderBy(tempArr, ['year'], ['desc']);
};

export default filterDataPoints;
