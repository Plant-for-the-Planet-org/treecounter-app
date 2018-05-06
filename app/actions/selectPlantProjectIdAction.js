import { setSelectedPlantProjectId } from '../reducers/selectedPlantProjectIdReducer';

export function selectPlantProjectIdAction(id) {
  return dispatch => {
    dispatch(setSelectedPlantProjectId(id));
  };
}
