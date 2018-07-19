import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/selectplantproject';
import { View, Text, Image } from 'react-native';
const PlantProjectSpecsItem = ({ label, value, icon, rightIcon }) => {
  return (
    <View style={styles.project_specs__item}>
      <Text style={styles.spec_icon__container}>
        {icon ? <Image style={styles.spec_icon} source={icon} /> : null}
      </Text>
      <View style={styles.project_specs__itemText}>
        <Text>{label}</Text>
      </View>
      <View style={styles.project_specs__itemText}>
        <Text>{value}</Text>
      </View>
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
