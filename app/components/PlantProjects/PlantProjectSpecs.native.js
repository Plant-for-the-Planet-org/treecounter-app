import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectSpecsItem from './PlantProjectSpecsItem';
import i18n from '../../locales/i18n.js';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-spec';
// import ToolTip from 'react-native-tooltip';
import RNTooltips from 'react-native-tooltips';

import {
  locationIcon,
  plantedTarget,
  target,
  tree_survival,
  dollar,
  questionmark_orange
} from '../../assets';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSpecs
 */

class PlantProjectSpecs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tootltipText: 'dummy',
      visible: false,
      deducibleText: ' ',
      reference: (
        <TouchableHighlight
          onPress={() => {
            this.toggleTooltip();
          }}
        >
          <Image
            style={styles.project_specs__taxdeductibleIcon}
            source={questionmark_orange}
          />
        </TouchableHighlight>
      )
    };
  }
  componentWillMount() {
    if (this.props.taxDeduction && this.props.taxDeduction.length > 2) {
      let tooltipText1 = '';
      let deducibleText1 = '';
      for (let i = 0; i < this.props.taxDeduction.length; i++) {
        if (i < 1) {
          deducibleText1 += this.props.taxDeduction[i] + ',';
        } else if (i == 1) {
          deducibleText1 += this.props.taxDeduction[i] + '.  ';
        } else {
          tooltipText1 += this.props.taxDeduction[i] + ',';
        }
      }
      this.setState({
        deducibleText: deducibleText1,
        tooltipText: tooltipText1
      });
    } else if (this.props.taxDeduction) {
      this.setState({ deducibleText: this.props.taxDeduction.join(',') });
    }
  }
  toggleTooltip() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const {
      location: location,
      countPlanted: countPlanted,
      countTarget: countTarget,
      survivalRate: survivalRate,
      currency: currency,
      treeCost: treeCost,
      taxDeduction: taxDeduction
    } = this.props;

    return (
      <View style={styles.project_specs__container}>
        <View style={styles.project_info}>
          <PlantProjectSpecsItem
            icon={locationIcon}
            value={location}
            label={i18n.t('label.location')}
          />
          <PlantProjectSpecsItem
            icon={plantedTarget}
            value={countPlanted}
            label={i18n.t('label.planted')}
          />
          <PlantProjectSpecsItem
            icon={target}
            value={countTarget}
            label={i18n.t('label.target')}
          />
          <PlantProjectSpecsItem
            icon={tree_survival}
            value={survivalRate}
            rightIcon={questionmark_orange}
            label={i18n.t('label.survival_rate')}
          />
          <PlantProjectSpecsItem
            icon={dollar}
            value={`${currency} ${treeCost.toFixed(2)}`}
            label={i18n.t('label.Cost')}
          />
        </View>
        <View style={styles.project_specs__taxdeductible}>
          <Text style={styles.project_specs__taxdeductibleText}>
            {taxDeduction && taxDeduction.length
              ? i18n.t('label.tax_deductible') + ' ' + i18n.t('label.in') + ' '
              : null}
          </Text>
          <Text style={styles.project_specs__taxdeductibleText}>
            {this.state.deducibleText}
          </Text>
          {this.state.reference}
          {/* <ToolTip
            ref="tooltip"
            actions={[
              { text: this.state.tooltipText ? this.state.tooltipText : '' }
            ]}
            underlayColor={'black'}
            style={styles.selectedName}
          >
            <Image
              style={styles.project_specs__taxdeductibleIcon}
              source={questionmark_orange}
            />
          </ToolTip> */}
          <RNTooltips
            text={this.state.tootltipText}
            visible={this.state.visible}
            reference={this.state.reference}
          />
        </View>
      </View>
    );
  }
}

PlantProjectSpecs.propTypes = {
  location: PropTypes.string,
  countPlanted: PropTypes.number.isRequired,
  countTarget: PropTypes.number,
  treeCost: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  taxDeduction: PropTypes.array,
  survivalRate: PropTypes.number.isRequired
};

export default PlantProjectSpecs;
