import React from 'react';
import PropTypes from 'prop-types';
import { CardElement } from 'react-stripe-elements';
import { payment_credit, payment_arrow } from '../../assets';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n';
import SavedPaymentCard from './SavedPaymentCard';

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

const CCForm = props => (
  <form className="payment-option" onSubmit={props.onSubmitCCForm}>
    <div
      onClick={() => {
        props.handleArrowClick('1');
      }}
      className="payment-option-header"
    >
      <span>
        <img className="logo" src={payment_credit} />
        {i18n.t('label.creditCard')}
      </span>
      <img className={props.style.arrow} src={payment_arrow} />
    </div>
    <SavedPaymentCard
      cards={props.cards}
      onChangeSelectedCard={props.onChangeSelectedCard}
    />
    <div className={props.style.displayNone}>
      <CardElement
        hidePostalCode={true}
        {...createOptions(props.style.fontSize)}
      />{' '}
      <input
        type="checkbox"
        className="payment-save-later-checkbox"
        name="save-for-later"
        checked={props.saveForLater}
        onChange={() => {
          props.onClickSaveForLater('saveForLaterCC');
        }}
      />
      Save for later
      <PrimaryButton>{i18n.t('label.pay')}</PrimaryButton>
    </div>
  </form>
);

export default CCForm;

CCForm.propTypes = {
  onSubmitCCForm: PropTypes.func,
  handleArrowClick: PropTypes.func,
  style: PropTypes.object,
  displayNone: PropTypes.object,
  fontSize: PropTypes.object,
  onClickSaveForLater: PropTypes.func,
  saveForLater: PropTypes.bool,
  cards: PropTypes.array,
  onChangeSelectedCard: PropTypes.func
};
