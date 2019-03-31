import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { close_green, darkTree, lightTree } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
import svgStyles from '../../styles/common/treecounter_svg';
import { View, Image, Text } from 'react-native';

class PlantedDetails extends Component {
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
    const { onToggle, personal, community, type } = this.props;
    return (
      <View style={svgStyles.svgTextContainer}>
        <View style={svgStyles.closeContainer}>
          <TouchableItem
            style={svgStyles.closeIcon}
            onPress={() => onToggle(false)}
          >
            <Image style={svgStyles.closeIconImg} source={close_green} />
          </TouchableItem>
        </View>

        <View style={svgStyles.svgPlantDetailRow}>
          <Image
            style={svgStyles.svgColumn1}
            resizeMode="contain"
            source={darkTree}
          />
          <View style={svgStyles.svgColumn2Temp}>
            <View>
              <Text style={{ fontSize: 8, color: '#686060', width: 'auto' }}>
                {i18n.t(
                  'individual' === type
                    ? 'label.individual_plant_personal'
                    : 'label.tpo_plant_personal'
                )}
              </Text>
            </View>

            <View>
              <Text style={svgStyles.svgTextValue}>
                {this.convertNumber(personal, 2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={svgStyles.divider} />
        <View style={svgStyles.svgTextRow}>
          <Image
            style={svgStyles.svgColumn1}
            resizeMode="contain"
            source={lightTree}
          />
          <View style={svgStyles.svgColumn2Temp}>
            <View>
              <Text style={{ fontSize: 8, color: '#686060', width: 'auto' }}>
                {i18n.t(
                  'individual' === type
                    ? 'label.individual_plant_community'
                    : 'label.tpo_individual_plant_community'
                )}
              </Text>
            </View>
            <View>
              <Text style={svgStyles.svgTextValue}>
                {this.convertNumber(parseInt(community), 2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.number.isRequired,
  community: PropTypes.number.isRequired,
  type: PropTypes.string,
  onToggle: PropTypes.func
};
