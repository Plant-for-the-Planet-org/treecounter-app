import { setSelectedPlantProjectId } from '../reducers/selectedPlantProjectIdReducer';

export function selectPlantProjectAction(id) {
  return dispatch => {
    dispatch(setSelectedPlantProjectId(id));
  };
}
