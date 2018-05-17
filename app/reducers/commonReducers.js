import entitiesReducer from './entitiesReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';

const commonReducers = {
  entities: entitiesReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer
};

export default commonReducers;
