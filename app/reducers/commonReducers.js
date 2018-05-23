import entitiesReducer from './entitiesReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';

const commonReducers = {
  entities: entitiesReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer
};

export default commonReducers;
