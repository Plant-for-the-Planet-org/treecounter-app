import { createAction, handleActions } from 'redux-actions';

export const setRecurringMonth = createAction('RECURRING_MONTH');
export const getRecurringMonth = state => state.recurringMonths;

export const initialState = {
  recurringMonths: null
};

const recurringReducer = handleActions(
  {
    [setRecurringMonth]: (state, action) => ({
      recurringMonths: action.payload.schema.properties.recurrencyMnemonic
    })
  },
  initialState
);

export default recurringReducer;
