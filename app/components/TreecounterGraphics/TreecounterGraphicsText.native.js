import React, { Component } from 'react';
import { Text, View, Animated, Easing, Image } from 'react-native';
import PropTypes from 'prop-types';

// import PlantedDetails from './PlantedDetails';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';
import { pot, tree } from '../../assets';
import SvgUri from 'react-native-svg-uri';
import i18n from '../../locales/i18n.js';

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
      <View className="svg-text-container">
        <View className="svg-text-container__row">
          <Image className="svg-text-container__row--col" source={pot} />
          <View className="svg-text-container__row--col2">
            <View>
              <Text>
                {i18n.t('label.target') +
                  (this.props.trillion
                    ? ''
                    : targetYear
                      ? ' ' + i18n.t('label.by') + ' ' + targetYear
                      : '') +
                  ' '}
              </Text>
              <Text>{this.convertNumber(target, 2)}</Text>
              <Text>
                {this.props.trillion ? (
                  <Text>{target.toLocaleString('en')}</Text>
                ) : null}
              </Text>
            </View>
          </View>
        </View>
        <View className="svg-text-container__bar" />
        <View className="svg-text-container__row">
          <SvgUri
            width="50"
            height="50"
            className="svg-text-container__row--col"
            source={tree}
          />
          <View className="svg-text-container__row--col2">
            <View>
              <Text>{i18n.t('label.planted')}</Text>
              <Text>{this.convertNumber(parseInt(planted), 2)}</Text>
              {this.props.trillion ? (
                <Text>{parseInt(planted).toLocaleString('en')}</Text>
              ) : null}
            </View>
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
