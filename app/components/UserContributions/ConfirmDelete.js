import ModalDialog from '../../components/Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import { attention } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n';

const ConfirmDeletion = ({ isOpen, onRequestClose, handleDeletion }) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <img className="success-image" src={attention} />
      <div className="confirm-message">
        {i18n.t('label.delete_my_trees_action')}
      </div>
      <div className="message">{i18n.t('label.my_trees_delete_confirm')}</div>
      <SecondaryButton
        onClick={() => {
          handleDeletion && handleDeletion();
        }}
      >
        {i18n.t('label.delete')}
      </SecondaryButton>
    </div>
  </ModalDialog>
);

ConfirmDeletion.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  handleDeletion: PropTypes.func
};

export default ConfirmDeletion;
