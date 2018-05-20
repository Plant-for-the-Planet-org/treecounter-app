import entitiesReducer from './entitiesReducer';
import authenticationReducer from './authenticationReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';

const commonReducers = {
  entities: entitiesReducer,
  authentication: authenticationReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer
};

export default commonReducers;
