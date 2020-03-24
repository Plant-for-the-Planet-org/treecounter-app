import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import styles from '../../../styles/popup/popup.native';
import PropTypes from 'prop-types';

const PopupNative = props => {
  return (
    <Modal
      animationType={props.animationType || 'slide'}
      transparent
      visible={props.isOpen}
      elevation="10"
    >
      <TouchableWithoutFeedback
        onPress={() => props.clickOutClose && props.onCancel()}
      >
        <View style={[styles.containerWrapper, props.containerWrapper]}>
          <View style={[styles.container, props.containerStyle]}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTextStyle}>{props.headerText}</Text>
            </View>
            <View style={[styles.bodyContainer, styles.bodyTextStyle]}>
              {/*<Text style={styles.bodyTextStyle}>{props.bodyText}</Text>*/}
              {props.bodyText}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.onCancel();
                }}
              >
                <View style={styles.cancelButtonContainer}>
                  <Text style={styles.cancelButtonTextStyle}>
                    {props.cancelText}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.onApply();
                }}
              >
                <View style={styles.applyButtonContainer}>
                  <Text
                    style={[styles.applyButtonTextStyle, props.applyTextStyle]}
                  >
                    {props.applyText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

PopupNative.propTypes = {
  onCancel: PropTypes.func,
  onApply: PropTypes.func,
  bodyText: PropTypes.any,
  applyText: PropTypes.string,
  cancelText: PropTypes.string,
  headerText: PropTypes.string,
  isOpen: PropTypes.bool,
  ...Modal.PropTypes
};

export default PopupNative;
