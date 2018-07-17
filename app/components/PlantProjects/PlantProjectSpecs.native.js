import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectSpecsItem from './PlantProjectSpecsItem';
import i18n from '../../locales/i18n.js';
import { View, Text } from 'react-native';
import styles from '../../styles/login';
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
const PlantProjectSpecs = ({
  location,
  countPlanted,
  countTarget,
  survivalRate,
  currency,
  treeCost,
  taxDeduction
}) => {
  return (
    <View style={styles.project_specs__container}>
      <View style={styles.project_info}>
        <PlantProjectSpecsItem
          icon="../../assets/images/icons/location.png"
          value={location}
          label={i18n.t('label.location')}
        />
        <PlantProjectSpecsItem
          icon="../../assets/images/icons/planted_target.png"
          value={countPlanted}
          label={i18n.t('label.planted')}
        />
        {/* <PlantProjectSpecsItem
          icon={target}
          value={countTarget}
          label={i18n.t('label.target')}
        /> */}
      </View>
      <View style={styles.plants_info}>
        {/* <PlantProjectSpecsItem
          icon={tree_survival}
          value={survivalRate}
          rightIcon={questionmark_orange}
          label={i18n.t('label.survival_rate')}
        />
        <PlantProjectSpecsItem
          icon={dollar}
          value={`${currency} ${treeCost}`}
          label={i18n.t('label.Cost')}
        /> */}
        <View style={styles.project_specs__taxdeductible}>
          <Text>
            {taxDeduction && taxDeduction.length
              ? i18n.t('label.tax_deductible') +
                ' ' +
                i18n.t('label.in') +
                ' ' +
                taxDeduction.join(', ')
              : null}
          </Text>
        </View>
      </View>
    </View>
  );
};

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
