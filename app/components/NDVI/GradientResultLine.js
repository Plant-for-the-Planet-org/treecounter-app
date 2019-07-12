import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';
import moment from 'moment';

const GradientResultLine = React.forwardRef((props, ref) => {
  const hightlightLineMetricts = getMetricsForDisplayingGradientLineHighlight(
    props.min,
    props.max
  );

  const [bgStyle, setBGStyle] = useState(0);

  useEffect(() => {
    let backgroundImage = `linear-gradient(to right,
      ${props.getColorForNDVI(props.min)} 0%,
      ${props.getColorForNDVI(props.avg)} 50%,
       ${props.getColorForNDVI(props.max)} 100%)`;
    backgroundImage = backgroundImage.replace(/(\r\n|\n|\r)/gm, '');
    console.log('backgroundImage', backgroundImage);
    setBGStyle({
      bgStyle: {
        backgroundImage: backgroundImage
      }
    });
  }, []);

  console.log('bgStyle', bgStyle);
  return (
    <div className="gradient-result-line-component">
      <div className="title">{`${moment.months(
        props.selectedDataPoint.month - 1
      )}, ${props.selectedDataPoint.year}`}</div>
      <div className="gradient-wrapper">
        {bgStyle &&
          props.min &&
          props.max && (
            <div
              className="highlight-line"
              style={{
                left: hightlightLineMetricts[0],
                width: hightlightLineMetricts[1],
                backgroundImage: bgStyle.backgroundImage
              }}
            />
          )}
        <div className="gradient-result-line" ref={ref} />
      </div>
    </div>
  );
});

export default GradientResultLine;

GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedDataPoint: PropTypes.object,
  getColorForNDVI: PropTypes.func,
  avg: PropTypes.func
};
