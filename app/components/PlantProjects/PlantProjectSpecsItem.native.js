import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/selectplantproject/selectplantproject-spec';
import { View, Text, Image } from 'react-native';
import ToolTip from 'react-native-tooltip';

const PlantProjectSpecsItem = ({ label, value, icon, rightIcon }) => {
  return (
    <View style={styles.project_specs__item}>
      <Text style={styles.spec_icon__container}>
        {icon ? <Image style={styles.spec_icon} source={icon} /> : null}
      </Text>
      <View
        style={[
          styles.project_specs__itemText,
          styles.project_specs__itemTextsurvival
        ]}
      >
        <Text style={styles.project_specs__itemText_left}>{label + ' '}</Text>
        {rightIcon ? (
          <ToolTip
            actions={[
              {
                text:
                  'Percentage of planted trees that survive the first year after planting.'
              }
            ]}
            underlayColor={'black'}
            style={styles.selectedName}
          >
            <Image style={styles.spec_icon} source={rightIcon} />
          </ToolTip>
        ) : null}
      </View>
      <View style={styles.project_specs__itemText}>
        <Text style={styles.project_specs__itemText_right}>{value}</Text>
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
