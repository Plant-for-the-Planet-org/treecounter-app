import React from 'react';
import { Alert, Modal, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getProgressModelState } from '../../../reducers/modelDialogReducer';
import LoadingIndicator from '../LoadingIndicator';

const ProgressModal = () => {
  // This component will re-render anytime progressModalState is updated in redux
  const isOpen = useSelector(getProgressModelState);
  const backgroundColor = 'rgba(255,255,255,0.5)';

  return (
    <Modal
      animationType={'slide'}
      transparent
      visible={isOpen}
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
          backgroundColor
        }}
      >
        <LoadingIndicator contentLoader screen="defaultLoader" />
      </View>
    </Modal>
  );
};

export default ProgressModal;
