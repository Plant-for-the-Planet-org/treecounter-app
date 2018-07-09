import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { payment_sepa, payment_arrow } from '../../../assets';

import type { InjectedProps } from '../Stripe/inject';

import { IbanElement, injectStripe } from '../Stripe/stripeDefs';
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
        fontSize: '15px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
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

class _StripeSepa extends React.Component<
  InjectedProps & { fontSize: string }
> {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = ev => {
    const { currency, context } = this.props;
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'sepa_debit',
          currency: currency,
          owner: {
            name: context.donorName,
            email: context.donorEmail
          },
          mandate: {
            notification_method: 'email'
          }
        })
        .then(payload => {
          this.props.onSuccess(payload);
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  handleArrowClick = () => {
    this.props.handleExpandedClicked('2');
  };

  render() {
    let arrow = classnames({
      arrow: !this.props.expanded
    });
    let displayNone = classnames({
      'display-none': !this.props.expanded
    });
    return (
      <form className="payment-option" onSubmit={this.handleSubmit}>
        <div onClick={this.handleArrowClick} className="payment-option-header">
          <span>
            <img className="logo" src={payment_sepa} />
            {i18n.t('label.sepa_debit')}
          </span>
          <img className={arrow} src={payment_arrow} />
        </div>
        <div className={displayNone}>
          <IbanElement
            supportedCountries={['SEPA']}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
          <div className="mandate-acceptance">
            {i18n.t('label.stripe_sepa_des1')} {this.props.context.tpoName}{' '}
            {i18n.t('label.stripe_sepa_des2')}
          </div>
          <PrimaryButton>{i18n.t('label.pay_via_sepa')}</PrimaryButton>
        </div>
      </form>
    );
  }
}

const StripeSepa = injectStripe(_StripeSepa);

_StripeSepa.propTypes = {
  stripe: PropTypes.object,
  fontSize: PropTypes.string,
  currency: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onError: PropTypes.func,
  onFailure: PropTypes.func
};

export default StripeSepa;
