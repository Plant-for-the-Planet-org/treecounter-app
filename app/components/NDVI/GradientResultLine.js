import React from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';
import moment from 'moment';
const GradientResultLine = props => {
  const hightlightLineMetricts = getMetricsForDisplayingGradientLineHighlight(
    props.min,
    props.max
  );
  return (
    <div className="gradient-result-line-component">
      <div className="title">{`${moment.months(
        props.selectedDataPoint.month - 1
      )}, ${props.selectedDataPoint.year}`}</div>
      <div className="gradient-wrapper">
        {props.min &&
          props.max && (
            <div
              className="highlight-line"
              style={{
                left: hightlightLineMetricts[0],
                width: hightlightLineMetricts[1]
              }}
            />
          )}
        <div className="gradient-result-line" />
      </div>
    </div>
  );
};

export default GradientResultLine;

GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedDataPoint: PropTypes.object
};
