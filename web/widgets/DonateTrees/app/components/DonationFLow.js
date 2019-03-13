import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../../../app/components/Common/Button/PrimaryButton';

class DonationFlow extends React.Component {
  render() {
    return (
      <div>
        Donation Flow will come here<PrimaryButton
          onClick={event => {
            let x = document.getElementsByClassName('overlay-container');
            const body = document.body;
            body.removeChild(x[0]);
          }}
        >
          Close
        </PrimaryButton>
      </div>
    );
  }
}

DonationFlow.propTypes = {
  plantProject: PropTypes.object
};

export default DonationFlow;
