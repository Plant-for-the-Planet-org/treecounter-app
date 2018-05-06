import { createAction, handleActions } from 'redux-actions';

export const setSelectedPlantProjectId = createAction(
  'SELECTED_PLANT_PROJECT_ID_SET'
);
export const getSelectedPlantProjectId = state => state.selectedPlantProjectId;

export const initialState = null;

const selectPlantProjectReducer = handleActions(
  {
    [setSelectedPlantProjectId]: (state, action) => action.payload
  },
  initialState
);

export default selectPlantProjectReducer;
