import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
const colorLiteralBlack = 'black';
const PrimaryButton = ({
  // onClick,
  // children,
  // buttonStyle,
  // textStyle,
  selected,
  style
}) => (
  <View
    style={[
      {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colorLiteralBlack,
        alignItems: 'center',
        justifyContent: 'center'
      },
      style
    ]}
  >
    {selected ? (
      <View
        style={{
          height: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor: colorLiteralBlack
        }}
      />
    ) : null}
  </View>
);

PrimaryButton.propTypes = {
  selected: PropTypes.boolean
};

export default PrimaryButton;
