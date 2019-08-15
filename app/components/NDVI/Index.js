import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientResultLine from './GradientResultLine';
import TimeSeries from './TimeSeries';
import _ from 'lodash';
import i18n from '../../locales/i18n.js';

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

export default class NDVIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDataPoint: this.props.dataPoints[0] };
  }

  componentDidMount() {
    if (!this.props.dataPoints) return;
    this.mountRecentDataPoint(this.props.dataPoints[0]);
  }

  mountRecentDataPoint = dataPoint => {
    this.setState({ selectedDataPoint: dataPoint });
  };

  onClickCircle = circleMonthuid => {
    this.getColorForNDVI();
    this.setState({
      selectedDataPoint: this.props.dataPoints[
        this.findDataPointIndex(circleMonthuid)
      ]
    });
  };

  findDataPointIndex(monthUid) {
    return _.findIndex(this.props.dataPoints, function(o) {
      return o.monthUid == monthUid;
    });
  }

  getStepColor = (colorA, colorB, value) => {
    return colorA.map(function(color, i) {
      return (color + value * (colorB[i] - color)) & 255;
    });
  };

  getColorForNDVI = (point = 0) => {
    if (point > 1) {
      point = 1;
    }
    if (point < -1) {
      point = -1;
    }
    let gradient = this.GradientRef;
    let percentage = 50;
    if (point > 0) {
      percentage = point * 100 / 2 + 50;
    } else {
      percentage = 100 - (Math.abs(point) * 100 / 2 + 50);
    }
    let i;
    for (i = 0; i < colorStops.length; i++) {
      if (colorStops[i].percentage > percentage) {
        break;
      }
    }

    let lowerIndex = i == 1 ? 0 : i - 1;
    let upperIndex = lowerIndex + 1;
    let percentageWidth = percentage / 100 * gradient.offsetWidth;
    let value =
      (percentageWidth / (gradient.offsetWidth / (colorStops.length - 1))) % 1;

    let color = this.getStepColor(
      colorStops[lowerIndex].color,
      colorStops[upperIndex].color,
      value
    );
    console.log(color);
    return `rgb(${color.join(',')})`;
  };
  render() {
    const dataPoints = this.props.dataPoints;
    return (
      <div className="ndvi-container">
        <div className="row month-keyword">
          {_.toArray(i18n.t('label.NDVI_container_static_month')).map(
            (letter, index) => (
              <div key={index} className="letter-box">
                <p>{letter}</p>
              </div>
            )
          )}
        </div>
        <TimeSeries
          getColorForNDVI={this.getColorForNDVI}
          dataPoints={dataPoints}
          onClickCircle={this.onClickCircle}
        />
        <Legend
          indicatorsSpell={i18n.t('label.NDVI_legend_indicators')}
          grasslandsSpell={i18n.t('label.NDVI_legend_grasslands')}
          rockSandSnowSpell={i18n.t('label.NDVI_legend_rock_sand_snow')}
          waterSpell={i18n.t('label.NDVI_legend_water')}
          denseVegetationSpell={i18n.t('label.NDVI_legend_dense_vegetation')}
        />
        <GradientResultLine
          getColorForNDVI={this.getColorForNDVI}
          ref={c => (this.GradientRef = c)}
          max={this.state.selectedDataPoint.ndviAggregate.max}
          min={this.state.selectedDataPoint.ndviAggregate.min}
          avg={this.state.selectedDataPoint.ndviAggregate.avg}
          selectedDataPoint={this.state.selectedDataPoint}
        />
        <Info
          ndviResulFromSpell={i18n.t('label.NDVI_info_results')}
          minimumSpell={i18n.t('label.NDVI_info_minimum')}
          averageSpell={i18n.t('label.NDVI_info_average')}
          maximumSpell={i18n.t('label.NDVI_info_maximum')}
          selectedDataPoint={this.state.selectedDataPoint}
        />
      </div>
    );
  }
}

NDVIContainer.propTypes = {
  dataPoints: PropTypes.array
};
