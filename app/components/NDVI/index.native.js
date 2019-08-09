import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientResultLine from './GradientResultLine';
import TimeSeries from './TimeSeries';
import { View, Text } from 'react-native';
import CardLayout from '../Common/Card';
import _ from 'lodash';
import i18n from '../../locales/i18n.js';
import CarbonDetails from './CarbonDetails';
import styles from '../../styles/NDVI/Index';

export default class NDVIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataPoint: !!this.props.dataPoints && {
        ...this.props.dataPoints[0],
        carbon: undefined
      }
    };
  }

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
    const monthStyle = styles.monthStyle;
    return (
      <React.Fragment>
        <CardLayout>
          <View style={styles.container}>
            <Text style={{ opacity: 0 }}>2222</Text>
            <Text style={monthStyle}>J</Text>
            <Text style={monthStyle}>F</Text>
            <Text style={monthStyle}>M</Text>
            <Text style={monthStyle}>A</Text>
            <Text style={monthStyle}>M</Text>
            <Text style={monthStyle}>J</Text>
            <Text style={monthStyle}>J</Text>
            <Text style={monthStyle}>A</Text>
            <Text style={monthStyle}>S</Text>
            <Text style={monthStyle}>O</Text>
            <Text style={monthStyle}>N</Text>
            <Text style={monthStyle}>D</Text>
          </View>
          <TimeSeries
            dataPoints={dataPoints}
            onClickCircle={this.onClickCircle}
          />
          <Legend />
          <GradientResultLine
            selectedDataPoint={this.state.selectedDataPoint}
          />
          <Info
            ndviResulFromSpell={i18n.t('label.NDVI_info_results')}
            minimumSpell={i18n.t('label.NDVI_info_minimum')}
            averageSpell={i18n.t('label.NDVI_info_average')}
            maximumSpell={i18n.t('label.NDVI_info_maximum')}
            selectedDataPoint={this.state.selectedDataPoint}
            toolTipHelpButtonSpell={i18n.t(
              'label.NDVI_tooltip_for_help_button'
            )}
          />
        </CardLayout>
        {this.state.selectedDataPoint.carbon != undefined ? (
          <CarbonDetails
            carbonValue={this.state.selectedDataPoint.carbon}
            toolTipHelpButtonSpell={i18n.t('label.NDVI_carbon_tooltip')}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

NDVIContainer.propTypes = {
  dataPoints: PropTypes.array.isRequired
};
