import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { payment_credit, payment_arrow } from '../../../assets';

import type { InjectedProps } from '../Stripe/inject';

import { CardElement, injectStripe } from '../Stripe/stripeDefs';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import i18n from '../../../locales/i18n';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};
const createOptions = (fontSize: string, padding: ?string) => {
  return {
    style: {
      base: {
        fontSize,
        borderWidth: '1px',
        borderStyle: 'solid',
        height: '100px',
        borderColor: '#FFCC00',
        color: '#FFCC00',
        letterSpacing: '0.025em',
        fontFamily: 'Verdana',
        '::placeholder': {
          color: '#aab7c4'
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class _StripeCC extends React.Component<InjectedProps & { fontSize: string }> {
  constructor(props) {
    super(props);
    this.state = {
      submitClicked: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = ev => {
    this.setState({
      submitClicked: true
    });
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => {
          console.log('SUCCESS', payload);
          this.props.onSuccess(payload);
        })
        .catch(error => this.props.onError(error));
    } else {
      this.props.onError("Stripe.js hasn't loaded yet.");
    }
  };

  handleArrowClick = () => {
    this.props.handleExpandedClicked('1');
  };

  render() {
    let arrow = classnames({
      arrow: !this.props.expanded
    });
    let displayNone = classnames({
      'display-none': !this.props.expanded
    });
    return (
      <form
        className="payment-option"
        onSubmit={
          this.state.submitClicked
            ? ev => ev.preventDefault()
            : this.handleSubmit
        }
      >
        <div onClick={this.handleArrowClick} className="payment-option-header">
          <span>
            <img className="logo" src={payment_credit} />
            {i18n.t('label.creditCard')}
          </span>
          <img className={arrow} src={payment_arrow} />
        </div>
        <div className={displayNone}>
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            hidePostalCode={true}
            {...createOptions(this.props.fontSize)}
          />
          <PrimaryButton>{i18n.t('label.pay')}</PrimaryButton>
        </div>
      </form>
    );
  }
}

_StripeCC.propTypes = {
  stripe: PropTypes.object,
  fontSize: PropTypes.string,
  currency: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};

const StripeCC = injectStripe(_StripeCC);

export default StripeCC;
