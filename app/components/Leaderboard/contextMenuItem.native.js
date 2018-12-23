import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { radio_button_selected, radio_button } from '../../assets';
import styles from '../../styles/leaderboard/leader_board';

const ContextMenuItem = ({ children, selected }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={styles.itemViewText}>{children}</Text>
    <Image
      style={{ height: 20, width: 20, marginLeft: 5, resizeMode: 'contain' }}
      source={selected ? radio_button_selected : radio_button}
    />
  </View>
);

ContextMenuItem.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.any
};

export default ContextMenuItem;
