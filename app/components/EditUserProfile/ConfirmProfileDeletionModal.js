import ModalDialog from '../../components/Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import { check_green } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';

const ConfirmProfileDeletion = ({
  isOpen,
  onRequestClose,
  handleProfileDeletion
}) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <img className="success-image" src={check_green} />
      <div className="confirm-message">Are you sure ? </div>
      <div className="message">
        Once you confirm, all of your account data will be deleted. this can not
        be undone
      </div>
      <SecondaryButton
        onClick={() => {
          handleProfileDeletion && handleProfileDeletion();
        }}
      >
        Delete Profile
      </SecondaryButton>
    </div>
  </ModalDialog>
);

ConfirmProfileDeletion.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  handleProfileDeletion: PropTypes.func
};

export default ConfirmProfileDeletion;
