import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { AppStoreLogo } from '../assets';
import i18n from '../locales/i18n.js';

export class DownloadAppModal extends Component {
  redirectUser() {
    window.location =
      'https://itunes.apple.com/app/plant-for-the-planet/id1444740626?mt=8';
  }
  render() {
    let { isOpen, onRequestClose, continueOnSite } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        className="progressModal widthAdjust"
        overlayClassName="Overlay"
        portalClassName="ModalPortal"
        ariaHideApp={false}
        onRequestClose={onRequestClose}
        shouldFocusAfterRender={true}
      >
        <div>
          <img
            onClick={this.redirectUser}
            className="image_full_width"
            src={AppStoreLogo}
          />
          <div className="or_class">{i18n.t('label.OR')}</div>
          <div onClick={continueOnSite} className="continue_on_site">
            {i18n.t('label.continue_on_site')}
          </div>
        </div>
      </Modal>
    );
  }
}

DownloadAppModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  continueOnSite: PropTypes.func
};

export default DownloadAppModal;
