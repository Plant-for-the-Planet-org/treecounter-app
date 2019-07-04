import React from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';

const GradientResultLine = props => {
  //This method returns left and width in pixel for highlight line
  const hightlightLineMetricts = getMetricsForDisplayingGradientLineHighlight(
    props.min,
    props.max
  );

  return (
    <div className="gradient-result-line-component">
      <h2 className="title">Current</h2>
      <div className="gradient-wrapper">
        <div
          className="highlight-line"
          style={{
            left: hightlightLineMetricts[0] + 'px',
            width: hightlightLineMetricts[1] + 'px'
          }}
        >
          .
        </div>
        <div className="gradient-result-line">.</div>
      </div>
    </div>
  );
};

export default GradientResultLine;

GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
