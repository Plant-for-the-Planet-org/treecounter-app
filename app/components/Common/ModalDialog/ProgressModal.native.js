import React, { Component } from 'react';
import { View, Modal, Alert } from 'react-native';

import LoadingIndicator from '../LoadingIndicator';

export default class ProgressModal extends Component {
  render = () => {
    const backgroundColor = 'rgba(255,255,255,0.5)';
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.props.modalVisible}
        elevation="10"
        onRequestClose={() => {
          Alert.alert('Loading cancelled in between');
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            backgroundColor: backgroundColor
          }}
        >
          <LoadingIndicator />
        </View>
      </Modal>
    );
  };
}
