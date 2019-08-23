import React from 'react';
import PropTypes from 'prop-types';
import { IbanElement } from 'react-stripe-elements';
import { payment_sepa, payment_arrow } from '../../assets';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n';

const createOptions = (fontSize, padding) => {
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

const SEPAForm = props => (
  <form className="payment-option" onSubmit={props.onSubmitSEPAForm}>
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
      <IbanElement
        supportedCountries={['SEPA']}
        // onChange={props.handleChange}
        {...createOptions()}
      />
      <div className="mandate-acceptance">
        {i18n.t('label.stripe_sepa_des1')} {props.tpoName}{' '}
        {i18n.t('label.stripe_sepa_des2')}
      </div>
      <PrimaryButton>{i18n.t('label.pay')}</PrimaryButton>
    </div>
  </form>
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
