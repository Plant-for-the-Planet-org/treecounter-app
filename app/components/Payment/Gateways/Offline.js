import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { payment_bank, payment_arrow } from '../../../assets';
import PrimaryButton from '../../Common/Button/PrimaryButton';

class Offline extends React.Component {
  handleArrowClick = () => {
    this.props.handleExpandedClicked('4');
  };

  /**
   * TODO: it must be validated that the user ticks the checkbox confirming the donation
   *       the onSuccess callback must be called with the following object:
   *       {userMessage, isConfirmed: <statusOfTheCheckbox>}
   */
  render() {
    const arrow = classnames({
      arrow: !this.props.expanded
    });
    const displayNone = classnames({
      'display-none': !this.props.expanded
    });

    const { account, amount, currency } = this.props;
    const userMessage = `I confirm that I will pay the amount of ${amount} ${currency} to the following account.`;

    return (
      <div className="payment-option">
        <div onClick={this.handleArrowClick} className="payment-option-header">
          <span>
            <img className="logo" src={payment_bank} /> Bank Transfer
          </span>
          <img className={arrow} src={payment_arrow} />
        </div>
        <form className={displayNone}>
          <div className="confirm-checkbox">
            <input type="checkbox" />
            {userMessage}
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
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default Offline;
