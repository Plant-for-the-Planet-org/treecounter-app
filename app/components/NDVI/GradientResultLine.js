/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import getMetricsForDisplayingGradientLineHighlight from './NDVIfunctions/getMetricsForDisplayingGradientLineHighlight';
import moment from 'moment';

class GradientResultLine extends React.PureComponent {
  constructor(props) {
    super();
    this.state = { bgStyle: {} };
    this.hasMounted = false;
  }

  componentDidMount() {
    const backgroundImage = this.calculateHighlightLineColor();
    this.setState({
      bgStyle: {
        backgroundImage: backgroundImage
      }
    });
    this.hasMounted = true;
  }

  calculateHighlightLineColor = () => {
    const props = this.props;
    let backgroundImage = `linear-gradient(to right,
      ${props.getColorForNDVI(props.min)} 0%,
      ${props.getColorForNDVI(props.avg)} 50%,
       ${props.getColorForNDVI(props.max)} 100%)`;
    backgroundImage = backgroundImage.replace(/(\r\n|\n|\r)/gm, '');
    // console.log('backgroundImage', backgroundImage);
    return backgroundImage;
  };

  render() {
    const props = this.props;
    let bgStyle = undefined;
    if (this.hasMounted) {
      bgStyle = { backgroundImage: this.calculateHighlightLineColor() };
    }

    this.state;
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
          <div className="gradient-result-line" ref={this.props.forwardedRef} />
        </div>
      </div>
    );
  }
}

//forwardRef is something new to React version 16.6
export default React.forwardRef((props, ref) => {
  return <GradientResultLine {...props} forwardedRef={ref} />;
});
GradientResultLine.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedDataPoint: PropTypes.object,
  getColorForNDVI: PropTypes.func,
  avg: PropTypes.number,
  forwardedRef: PropTypes.any
};
