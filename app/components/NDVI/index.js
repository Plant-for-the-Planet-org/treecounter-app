import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import Info from './Info';
import Legend from './Legend';
import GradientResultLine from './GradientResultLine';
import TimeSeries from './TimeSeries';
import _ from 'lodash';
import i18n from '../../locales/i18n.js';
import LoadingNDVI from './LoadingNDVI';
import CarbonDetails from './CarbonDetails';
import { getLocale } from '../../actions/getLocale';

const userLang = getLocale(); // en|de

export const firstLetterUppercase = string => {
  return string && string.replace(/^\w/, c => c.toLocaleUpperCase());
};

// date-fns does not seem to have a one-letter format for a month name
// so we are using Intl.DateTimeFormat here to format the month
export const getMonthsForLocale = (locale, options = { month: 'short' }) => {
  let format = new Intl.DateTimeFormat(locale, options);
  let months = [];
  for (let month = 0; month < 12; month++) {
    let testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
    months.push(firstLetterUppercase(format.format(testDate)));
  }
  return months;
};

const shortMonths = getMonthsForLocale(userLang);
const narrowMonths = getMonthsForLocale(userLang, { month: 'narrow' });

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

export default class NDVI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataPoint: !!this.props.dataPoints && this.props.dataPoints[0]
    };
    this;
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

  getColorForNDVI = point => {
    if (!point) {
      return `rgb(142, 142, 142)`;
    }
    if (point > 1) {
      point = 1;
    }
    if (point < -1) {
      point = -1;
    }
    let gradient = this.GradientRef;
    let percentage = 50;
    if (point > 0) {
      percentage = (point * 100) / 2 + 50;
    } else {
      percentage = 100 - ((Math.abs(point) * 100) / 2 + 50);
    }
    let i;
    for (i = 0; i < colorStops.length; i++) {
      if (colorStops[i].percentage > percentage) {
        break;
      }
    }

    let lowerIndex = i == 1 ? 0 : i - 1;
    let upperIndex = lowerIndex + 1;
    let percentageWidth = (percentage / 100) * gradient.offsetWidth;
    let value =
      (percentageWidth / (gradient.offsetWidth / (colorStops.length - 1))) % 1;

    let color = this.getStepColor(
      colorStops[lowerIndex].color,
      colorStops[upperIndex].color,
      value
    );
    // debug(color);
    return `rgb(${color.join(',')})`;
  };

  onClickRefresh = () => {
    this.props.refresh && this.props.refresh();
  };

  render() {
    const dataPoints = this.props.dataPoints;
    // const dataPoints = [];
    return (
      <React.Fragment>
        {!_.isUndefined(dataPoints) && dataPoints.length > 0 ? (
          <React.Fragment>
            <div className="column" style={{ width: '100%' }}>
              <div className={'ndvi-title'}>
                {i18n.t('label.NDVI_time_series')}
              </div>
              <div className="row">
                <div className="ndvi-container">
                  <div className="row  short-month-keyword">
                    {shortMonths.map((letter, index) => (
                      <div key={index} className="letter-box">
                        <p>{letter}</p>
                      </div>
                    ))}
                  </div>
                  <div className="row  narrow-month-keyword">
                    {narrowMonths.map((letter, index) => (
                      <div key={index} className="letter-box">
                        <p>{letter}</p>
                      </div>
                    ))}
                  </div>
                  <TimeSeries
                    getColorForNDVI={this.getColorForNDVI}
                    dataPoints={dataPoints}
                    onClickCircle={this.onClickCircle}
                  />
                  <Legend
                    indicatorsSpell={i18n.t('label.NDVI_legend_indicators')}
                    grasslandsSpell={i18n.t('label.NDVI_legend_grasslands')}
                    rockSandSnowSpell={i18n.t(
                      'label.NDVI_legend_rock_sand_snow'
                    )}
                    waterSpell={i18n.t('label.NDVI_legend_water')}
                    denseVegetationSpell={i18n.t(
                      'label.NDVI_legend_dense_vegetation'
                    )}
                  />
                  <GradientResultLine
                    getColorForNDVI={this.getColorForNDVI}
                    ref={c => (this.GradientRef = c)}
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
                </div>
              </div>

              {this.state.selectedDataPoint.carbon != undefined && (
                <React.Fragment>
                  <div className="carbon-box">
                    <div className="row">
                      <h4>{i18n.t('label.NDVI_carbon_title')}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <CarbonDetails
                      carbonValue={this.state.selectedDataPoint.carbon}
                      toolTipHelpButtonSpell={i18n.t(
                        'label.NDVI_carbon_tooltip'
                      )}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        ) : (
          <LoadingNDVI
            onRefreshClick={this.onClickRefresh}
            paragraphSpell={i18n.t('label.NDVI_on_load_paragraph')}
            refreshButtonSpell={i18n.t('label.NDVI_on_load_refresh_button')}
            toolTipHelpButtonSpell={i18n.t(
              'label.NDVI_tooltip_for_help_button'
            )}
          />
        )}
      </React.Fragment>
    );
  }
}

NDVI.propTypes = {
  dataPoints: PropTypes.array,
  refresh: PropTypes.func
};
