import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientResultLine from './GradientResultLine';
import TimeSeries from './TimeSeries';
import _ from 'lodash';
import i18n from '../../locales/i18n.js';

export default class NDVIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDataPoint: {} };
  }

  componentDidMount() {
    if (!this.props.dataPoints) return;
    this.mountRecentDataPoint(this.props.dataPoints[0]);
  }

  mountRecentDataPoint = dataPoint => {
    this.setState({ selectedDataPoint: dataPoint });
  };

  onClickCircle = circleMonthuid => {
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
          {...this.state.selectedDataPoint.ndviAggregate}
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
