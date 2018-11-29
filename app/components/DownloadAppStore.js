import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { AppStoreLogo } from '../assets';

export class DownloadAppModal extends Component {
  redirectUser() {
    window.location =
      'https://itunes.apple.com/in/app/plant-for-the-planet/id1444740626?mt=8';
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
          <div className="or_class">OR</div>
          <div onClick={continueOnSite} className="continue_on_site">
            Continue using the site
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
