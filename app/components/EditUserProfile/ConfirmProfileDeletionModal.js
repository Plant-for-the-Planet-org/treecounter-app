import ModalDialog from '../../components/Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import { check_green } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n';

const ConfirmProfileDeletion = ({
  isOpen,
  onRequestClose,
  handleProfileDeletion
}) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <img className="success-image" src={check_green} />
      <div className="confirm-message">{i18n.t('label.sure')}</div>
      <div className="message">{i18n.t('label.delete_confirmation')}</div>
      <SecondaryButton
        onClick={() => {
          handleProfileDeletion && handleProfileDeletion();
        }}
      >
        {i18n.t('label.delete_profile')}
      </SecondaryButton>
    </div>
  </ModalDialog>
);

ConfirmProfileDeletion.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  handleProfileDeletion: PropTypes.fun
};

export default ConfirmProfileDeletion;
