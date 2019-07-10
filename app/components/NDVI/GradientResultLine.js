import React from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';

const GradientResultLine = props => {
  const hightlightLineMetricts = getMetricsForDisplayingGradientLineHighlight(
    props.min,
    props.max
  );

  return (
    <div className="gradient-result-line-component">
      <h2 className="title">{props.correctSpell}</h2>
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
  correctSpell: PropTypes.string
};
