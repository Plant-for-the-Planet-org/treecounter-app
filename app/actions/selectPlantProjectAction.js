import {
  setSelectedPlantProjectId,
  clearSelectedPlantProjectId
} from '../reducers/selectedPlantProjectIdReducer';

export function selectPlantProjectAction(id) {
  return dispatch => {
    dispatch(setSelectedPlantProjectId(id));
  };
}

export function clearPlantProject() {
  return dispatch => {
    dispatch(clearSelectedPlantProjectId());
  };
}
