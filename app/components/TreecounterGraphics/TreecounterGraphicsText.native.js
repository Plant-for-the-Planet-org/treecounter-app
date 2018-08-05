import React, { Component } from 'react';
import { Text, View, Animated, Easing, Image } from 'react-native';
import PropTypes from 'prop-types';

// import PlantedDetails from './PlantedDetails';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';
import { pot, tree } from '../../assets';
import SvgUri from 'react-native-svg-uri';
import i18n from '../../locales/i18n.js';

import svgStyles from '../../styles/common/treecounter_svg';

class TreecounterGraphicsText extends Component {
  constructor() {
    super();
    this.state = {
      ifPlantedDetails: false,
      ifTargetComment: false
    };
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
        targetComment,
        planted,
        personal,
        community,
        type
      }
    } = this.props;

    return (
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
              {this.convertNumber(target, 2)}
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
          <View style={svgStyles.svgColumn1}>
            <SvgUri width="30" height="30" source={tree} />
          </View>
          <View style={svgStyles.svgColumn2}>
            <Text style={svgStyles.svgTitleText}>
              {i18n.t('label.planted')}
            </Text>
            <Text style={svgStyles.svgTextValue}>
              {this.convertNumber(parseInt(planted), 2)}
            </Text>
            {this.props.trillion ? (
              <Text style={svgStyles.svgTitleText}>
                {parseInt(planted).toLocaleString('en')}
              </Text>
            ) : null}
          </View>
          {this.props.trillion ? null : (
            <View className="svg-text-container__row--col2">
              {/* <ArrowButton
                onToggle={e => this.setState({ ifPlantedDetails: e })}
              /> */}
            </View>
          )}
        </View>
        {/* {this.state.ifPlantedDetails ? (
          <PlantedDetails
            personal={personal}
            community={community}
            type={type}
          />
        ) : null} */}
      </View>
    );
  }
}

TreecounterGraphicsText.propTypes = {
  treecounterData: PropTypes.object.isRequired,
  trillion: PropTypes.bool
};

export default TreecounterGraphicsText;
