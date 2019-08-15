import { createAction, handleActions } from 'redux-actions';

export const setCurrenciesConversions = createAction('CURRENCY_CONVERSION_SET');
export const getCurrencies = state => state.currencies;

export const initialState = {
  currencies: null
};

const currenciesReducer = handleActions(
  {
    [setCurrenciesConversions]: (state, action) => ({
      currencies: action.payload
    })
  },
  initialState
);

export default currenciesReducer;
