import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../../../app/components/Common/Button/PrimaryButton';
import ModalDialog from '../../../../../app/components/Common/ModalDialog';
// import { check_green } from '../../../../../app/assets';
// import i18n from '../../../../../app/locales/i18n';

class DonationFlow extends React.Component {
  render() {
    const { isOpen, onRequestClose } = this.props;
    return (
      <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
        <pftp-widget-donation-flow>
          <div slot="donation-flow">
            Donation Flow will come here<PrimaryButton>Test Me</PrimaryButton>
          </div>
        </pftp-widget-donation-flow>
      </ModalDialog>
    );
  }
}

DonationFlow.propTypes = {
  plantProject: PropTypes.object,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default DonationFlow;
