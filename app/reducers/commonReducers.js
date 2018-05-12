import entitiesReducer from './entitiesReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';

const commonReducers = {
  entities: entitiesReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  baseUrl: (state = {}) => state,
  serverName: (state = {}) => state,
  locale: (state = {}) => state
};

export default commonReducers;
