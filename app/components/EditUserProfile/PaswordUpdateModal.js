import ModalDialog from '../../components/Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import { check_green } from '../../assets';
import PrimaryButton from '../Common/Button/PrimaryButton';

const PaswordUpdatedDialog = ({ isOpen, onRequestClose }) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <img className="success-image" src={check_green} />
      <div className="message">
        {' '}
        Your password has been successfully changed
      </div>
      <PrimaryButton
        onClick={() => {
          onRequestClose && onRequestClose();
        }}
      >
        Return to My profile
      </PrimaryButton>
    </div>
  </ModalDialog>
);

PaswordUpdatedDialog.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default PaswordUpdatedDialog;
