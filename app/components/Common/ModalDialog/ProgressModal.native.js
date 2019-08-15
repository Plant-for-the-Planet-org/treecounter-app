import React, { Component } from 'react';
import { View, Modal, Alert } from 'react-native';

import LoadingIndicator from '../LoadingIndicator';

export default class ProgressModal extends Component {
  render = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
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
            backgroundColor: 'rgba(255,255,255,0.5)'
          }}
        >
          <LoadingIndicator />
        </View>
      </Modal>
    );
  };
}
