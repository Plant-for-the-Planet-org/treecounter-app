// @flow
import StripeProvider from '../Provider';
import injectStripe from './inject';
import Elements from './Elements';
import Element from './Element';

// Define Elements, and register their implied token / source types for
// automatic token / source creation.

// Card
const CardElement = Element('card', {
  impliedTokenType: 'card',
  impliedSourceType: 'card'
});

// IBAN
const IbanElement = Element('iban', {
  impliedTokenType: 'bank_account',
  impliedSourceType: 'sepa_debit'
});

export { StripeProvider, injectStripe, Elements, CardElement, IbanElement };
