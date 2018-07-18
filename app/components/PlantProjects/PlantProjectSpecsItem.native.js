import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/selectplantproject';
import { View, Text, Image } from 'react-native';
const PlantProjectSpecsItem = ({ label, value, icon, rightIcon }) => {
  return (
    <View style={styles.project_specs__item}>
      <Text style={styles.project_specs__itemText}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

PlantProjectSpecsItem.propTypes = {
  icon: PropTypes.any,
  rightIcon: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.string
};

export default PlantProjectSpecsItem;
