import ModalDialog from '../../components/Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import { check_green } from '../../assets';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n';
const space = ' ';
const PaswordUpdatedDialog = ({ isOpen, onRequestClose }) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <img className="success-image" src={check_green} />
      <div className="message">
        {space}
        {i18n.t('label.password_changed')}
      </div>
      <PrimaryButton
        onClick={() => {
          onRequestClose && onRequestClose();
        }}
      >
        {i18n.t('label.return_to_profile')}
      </PrimaryButton>
    </div>
  </ModalDialog>
);

PaswordUpdatedDialog.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default PaswordUpdatedDialog;
