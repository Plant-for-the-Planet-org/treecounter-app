import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { close_green, darkTree, lightTree } from '../../assets';
import TouchableItem from '../../components/Common/TouchableItem';
import svgStyles from '../../styles/common/treecounter_svg';
import { View, Image, Text } from 'react-native';
import { delimitNumbers } from '../../utils/utils';

class PlantedDetails extends Component {
  render() {
    const colorLiteral686060 = '#686060';
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
              <Text
                style={{
                  fontSize: 8,
                  color: colorLiteral686060,
                  width: 'auto'
                }}
              >
                {i18n.t(
                  'individual' === type
                    ? 'label.individual_plant_personal'
                    : 'label.tpo_plant_personal'
                )}
              </Text>
            </View>

            <View>
              <Text style={svgStyles.svgTextValue}>{personal}</Text>
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
              <Text
                style={{
                  fontSize: 8,
                  color: colorLiteral686060,
                  width: 'auto'
                }}
              >
                {i18n.t(
                  'individual' === type
                    ? 'label.individual_plant_community'
                    : 'label.tpo_individual_plant_community'
                )}
              </Text>
            </View>
            <View>
              <Text style={svgStyles.svgTextValue}>{community}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired,
  type: PropTypes.string,
  onToggle: PropTypes.func
};
