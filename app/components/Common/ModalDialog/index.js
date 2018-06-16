import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { check_green } from '../../../assets';

const ModalDialog = ({ children, isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    className="Modal"
    overlayClassName="Overlay"
    portalClassName="ModalPortal"
    ariaHideApp={false}
    onRequestClose={onRequestClose}
  >
    <img
      className="closeIcon"
      src={check_green}
      onClick={() => {
        onRequestClose();
      }}
    />
    <div className="modal-container">{children}</div>
  </Modal>
);

ModalDialog.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default ModalDialog;
