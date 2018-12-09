import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { checkedIcon, unCheckedIcon } from '../../assets';

const ContextMenuItem = ({ children, selected }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text>{children}</Text>
    <Image
      style={{ height: 15, width: 15, marginLeft: 5 }}
      source={selected ? checkedIcon : unCheckedIcon}
    />
  </View>
);

ContextMenuItem.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.any
};

export default ContextMenuItem;
