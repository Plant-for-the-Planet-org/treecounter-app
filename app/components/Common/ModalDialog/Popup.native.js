import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../../../styles/popup/popup.native';
import PropTypes from 'prop-types';

const PopupNative = props => {
  return (
    <Modal
      animationType={'slide'}
      transparent
      visible={props.isOpen}
      elevation="10"
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
            <TouchableWithoutFeedback
              onPress={() => {
                props.onCancel();
              }}
            >
              <View style={styles.cancelButtonContainer}>
                <Text style={styles.cancelButtonTextStyle}>
                  {props.cancelText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

PopupNative.propTypes = {
  onCancel: PropTypes.func,
  onApply: PropTypes.func,
  bodyText: PropTypes.string,
  applyText: PropTypes.string,
  cancelText: PropTypes.string,
  headerText: PropTypes.string,
  isOpen: PropTypes.bool,
  ...Modal.PropTypes
};

export default PopupNative;
