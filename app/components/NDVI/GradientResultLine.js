/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getPointPercentageOnGradient } from './NDVIfunctions/GradientUtils';
import parseMonth from './NDVIfunctions/parseMonth';

class GradientResultLine extends React.PureComponent {
  constructor(props) {
    super(props);
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
    const { selectedDataPoint } = props;
    let backgroundImage = `linear-gradient(to right,
      ${props.getColorForNDVI(selectedDataPoint.ndviAggregate.min)} 0%,
      ${props.getColorForNDVI(selectedDataPoint.ndviAggregate.avg)} 50%,
       ${props.getColorForNDVI(selectedDataPoint.ndviAggregate.max)} 100%)`;
    backgroundImage = backgroundImage.replace(/(\r\n|\n|\r)/gm, '');
    return backgroundImage;
  };

  render() {
    const props = this.props;
    const { selectedDataPoint } = props;
    if (!selectedDataPoint || !selectedDataPoint.ndviAggregate) {
      return null;
    }
    let bgStyle = undefined;
    if (this.hasMounted) {
      bgStyle = { backgroundImage: this.calculateHighlightLineColor() };
    }

    const minPercentage = getPointPercentageOnGradient(
      selectedDataPoint.ndviAggregate.min
    );
    const maxPercentage = getPointPercentageOnGradient(
      selectedDataPoint.ndviAggregate.max
    );

    return (
      <div className="gradient-result-line-component">
        <div className="title">{`${parseMonth(
          props.selectedDataPoint.month - 1
        )}, ${props.selectedDataPoint.year}`}</div>
        <div className="gradient-wrapper">
          {bgStyle &&
            selectedDataPoint.ndviAggregate.min &&
            selectedDataPoint.ndviAggregate.max && (
              <div
                className="highlight-line"
                style={{
                  left: minPercentage + '%',
                  width: `${maxPercentage - minPercentage}%`,
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
  selectedDataPoint: PropTypes.object,
  getColorForNDVI: PropTypes.func,
  forwardedRef: PropTypes.any
};
