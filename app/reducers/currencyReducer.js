import isEqual from 'lodash/isEqual';
import { createAction, handleActions } from 'redux-actions';
import { context } from '../config';
export const setCurrency = createAction('CURRENCY_SET');
export const getGlobalCurrency = state => state.currency;

export const initialState = {
  currency: context.currency
};

const currencyReducer = handleActions(
  {
    [setCurrency]: (state, action) => ({
      currency: isEqual(state.currency, action.payload)
        ? state.currency
        : action.payload
    })
  },
  initialState
);

export default currencyReducer;
