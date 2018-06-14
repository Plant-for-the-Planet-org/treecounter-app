import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { payment_bank, payment_arrow } from '../../../assets';
import PrimaryButton from '../../Common/Button/PrimaryButton';

class Offline extends React.Component {
  handleArrowClick = () => {
    if (this.props.expanded !== true) {
      this.props.handleExpandedClicked('4');
    } else {
      this.props.handleExpandedClicked('');
    }
  };

  render() {
    let arrow = classnames({
      arrow: !this.props.expanded
    });
    let displayNone = classnames({
      'display-none': !this.props.expanded
    });
    let { account } = this.props;
    return (
      <div className="payment-option">
        <div className="payment-option-header">
          <span>
            <img className="logo" src={payment_bank} /> Bank Transfer
          </span>
          <img
            className={arrow}
            onClick={this.handleArrowClick}
            src={payment_arrow}
          />
        </div>
        <form className={displayNone}>
          <div className="confirm-checkbox">
            <input type="checkbox" />
            I confirm that I will pay the amount of 20 Euro to the following
            account.
          </div>
          <div className="account-details">{account.full_text}</div>
          <PrimaryButton>Pay via Bank Transfer</PrimaryButton>
        </form>
      </div>
    );
  }
}

Offline.propTypes = {
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default Offline;
