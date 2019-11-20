import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { attention } from '../../assets';

const SecondaryButton = lazy(() => import('../Common/Button/SecondaryButton'));
const ModalDialog = lazy(() => import('../../components/Common/ModalDialog'));

import i18n from '../../locales/i18n';

const ConfirmProfileDeletion = ({
  isOpen,
  onRequestClose,
  handleProfileDeletion
}) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <img className="success-image" src={attention} />
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
  handleProfileDeletion: PropTypes.func
};

export default ConfirmProfileDeletion;
