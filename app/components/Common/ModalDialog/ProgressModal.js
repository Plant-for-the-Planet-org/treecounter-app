import Modal from 'react-modal';
import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';

const ProgressModal = ({ isOpen, onRequestClose }) => (
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

ProgressModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default ProgressModal;
