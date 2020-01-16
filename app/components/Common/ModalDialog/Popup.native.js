import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import styles from '../../../styles/popup/popup.native';
import PropTypes from 'prop-types';
import { isIOS, isAndroid } from '../../../utils/utils';

const PopupNative = props => {
  return (
    <Modal
      animationType={'slide'}
      transparent
      visible={props.isOpen}
      elevation="10"
    >
      <View style={[styles.containerWrapper, props.containerWrapper]}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTextStyle}>{props.headerText}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyTextStyle}>{props.bodyText}</Text>
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
                <Text style={styles.applyButtonTextStyle}>
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
