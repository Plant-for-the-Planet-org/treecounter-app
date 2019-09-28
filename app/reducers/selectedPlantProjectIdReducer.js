import { createAction, handleActions } from 'redux-actions';

export const setSelectedPlantProjectId = createAction(
  'SELECTED_PLANT_PROJECT_ID_SET'
);
export const clearSelectedPlantProjectId = createAction(
  'CLEAR_PLANT_PROJECT_ID_SET'
);
export const getSelectedPlantProjectId = state => state.selectedPlantProjectId;

export const initialState = null;

const selectedPlantProjectIdReducer = handleActions(
  {
    [setSelectedPlantProjectId]: (state, action) => action.payload,
    // eslint-disable-next-line no-unused-vars
    [clearSelectedPlantProjectId]: (state, action) => initialState
  },
  initialState
);

export default selectedPlantProjectIdReducer;
