import ModalDialog from '../../components/Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import { attention } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n';

const ConfirmDeletion = ({ isOpen, onRequestClose, handleDeletion }) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <div className="message">{i18n.t('label.my_tree_delete_confirm')}</div>
      <SecondaryButton
        onClick={() => {
          handleDeletion && handleDeletion();
        }}
      >
        {i18n.t('label.delete_profile')}
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
