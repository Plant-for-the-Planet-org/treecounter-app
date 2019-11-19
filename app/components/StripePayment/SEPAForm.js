import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { IbanElement } from 'react-stripe-elements';
import { payment_sepa, payment_arrow } from '../../assets';

const PrimaryButton = lazy(() => import('../Common/Button/PrimaryButton'));

import i18n from '../../locales/i18n';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        borderStyle: 'solid',
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

const SEPAForm = props => (
  <div className="payment-option">
    <div
      onClick={() => {
        props.handleArrowClick('2');
      }}
      className="payment-option-header"
    >
      <span>
        <img className="logo" src={payment_sepa} />
        {i18n.t('label.sepa_debit')}
      </span>
      <img className={props.style.arrow} src={payment_arrow} />
    </div>
    <div className={props.style.displayNone}>
      <IbanElement supportedCountries={['SEPA']} {...createOptions()} />

      <div className="mandate-acceptance">
        {i18n.t('label.stripe_sepa_des1')} {props.tpoName}{' '}
        {i18n.t('label.stripe_sepa_des2')}
      </div>
      <PrimaryButton onClick={props.onSubmitSEPAForm}>
        {i18n.t('label.pay')}
      </PrimaryButton>
    </div>
  </div>
);

export default SEPAForm;

SEPAForm.propTypes = {
  onSubmitSEPAForm: PropTypes.func,
  handleArrowClick: PropTypes.func,
  tpoName: PropTypes.string,
  style: PropTypes.object,
  displayNone: PropTypes.object,
  fontSize: PropTypes.object
};
