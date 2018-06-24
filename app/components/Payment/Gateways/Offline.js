import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { payment_bank, payment_arrow } from '../../../assets';
import PrimaryButton from '../../Common/Button/PrimaryButton';

class Offline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxState: false
    };
  }

  handleCheckbox(event) {
    this.setState({
      checkboxState: event.target.checked
    });
  }
  handleSubmit = ev => {
    ev.preventDefault();
    if (this.state.checkboxState) {
      this.props.onSuccess({
        userMessage: 'Success',
        isConfirmed: this.state.checkboxState
      });
    }
  };
  handleArrowClick = () => {
    this.props.handleExpandedClicked('4');
  };
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
        <form onSubmit={ev => this.handleSubmit(ev)} className={displayNone}>
          <div className="confirm-checkbox">
            <input
              onChange={event => this.handleCheckbox(event)}
              type="checkbox"
            />
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
