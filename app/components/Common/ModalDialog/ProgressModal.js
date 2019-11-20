import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import { getProgressModelState } from '../../../reducers/modelDialogReducer';
const LoadingIndicator = lazy(() => import('../LoadingIndicator'));

const ProgressModal = ({ onRequestClose }) => {
  // This component will re-render anytime progressModalState is updated in redux:
  //   dispatch(setProgressModelState(true));
  const isOpen = useSelector(getProgressModelState);

  return (
    <Modal
      isOpen={isOpen}
      className="progressModal"
      overlayClassName="Overlay"
      portalClassName="ModalPortal"
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      shouldFocusAfterRender
    >
      <div>
        <LoadingIndicator />
      </div>
    </Modal>
  );
};

ProgressModal.propTypes = {
  onRequestClose: PropTypes.func
};

export default ProgressModal;
