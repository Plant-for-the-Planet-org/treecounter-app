import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import ArrowButton from '../Common/ArrowButton.native';
import { pot, darkTree } from '../../assets';
import i18n from '../../locales/i18n';

import svgStyles from '../../styles/common/treecounter_svg';
import PlantedDetails from './PlantDetails.native';

class TreecounterGraphicsText extends Component {
  constructor() {
    super();
    this.state = {
      ifPlantedDetails: false,
      ifTargetComment: false
    };
  }
  updateState(stateVal) {
    this.setState({ ifPlantedDetails: stateVal });
    this.props.onToggle(stateVal);
  }

  convertNumber(n, d) {
    let x = ('' + n).length;
    if (x > 5) {
      let p = Math.pow;
      d = p(10, d);
      x -= x % 3;
      return (
        Math.round(n * d / p(10, x)) / d +
        [
          '',
          ' Thousand',
          ' Million',
          ' Billion',
          ' Trillion',
          ' Quadrillion',
          ' Quintillion'
        ][x / 3]
      );
    } else {
      return n;
    }
  }

  render() {
    const {
      treecounterData: {
        targetYear,
        target,
        planted,
        personal,
        community,
        type
      }
    } = this.props;
    let dom;
    {
      dom = !this.state.ifPlantedDetails ? (
        <View style={svgStyles.svgTextContainer}>
          <View style={svgStyles.svgTextRow}>
            <Image style={svgStyles.svgColumn1} source={pot} />
            <View style={svgStyles.svgColumn2}>
              <Text style={svgStyles.svgTitleText}>
                {i18n.t('label.target') +
                  (this.props.trillion
                    ? ''
                    : targetYear
                      ? ' ' + i18n.t('label.by') + ' ' + targetYear
                      : '') +
                  ' '}
              </Text>
              <Text style={svgStyles.svgTextValue}>
                {this.convertNumber(parseInt(target), 2)}
              </Text>
              {this.props.trillion ? (
                <Text style={svgStyles.svgTitleText}>
                  {target.toLocaleString('en')}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={svgStyles.divider} />
          <View style={svgStyles.svgTextRow}>
            <Image style={svgStyles.svgColumn1} source={darkTree} />
            <View style={svgStyles.svgColumn2}>
              <Text style={svgStyles.svgTitleText}>
                {i18n.t('label.planted')}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={svgStyles.svgTextValue}>
                  {this.convertNumber(parseInt(planted), 2)}
                </Text>
                {this.props.trillion ||
                this.convertNumber(parseInt(community), 2) == 0 ? null : (
                  <View style={svgStyles.svgArrow}>
                    <ArrowButton onToggle={e => this.updateState(e)} />
                  </View>
                )}
              </View>

              {this.props.trillion ? (
                <Text style={svgStyles.svgTitleText}>
                  {parseInt(planted).toLocaleString('en')}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      ) : (
        <PlantedDetails
          personal={this.convertNumber(parseInt(personal), 2)}
          community={this.convertNumber(parseInt(community), 2)}
          type={type}
          onToggle={e => this.updateState(e)}
        />
      );
    }
    return dom;
  }
}

TreecounterGraphicsText.propTypes = {
  treecounterData: PropTypes.object.isRequired,
  trillion: PropTypes.bool,
  onToggle: PropTypes.func
};

export default TreecounterGraphicsText;
