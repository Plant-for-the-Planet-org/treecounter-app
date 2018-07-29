import entitiesReducer from './entitiesReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';
import userFeedReducer from './userFeedReducer';
import fetchPledgesReducer from './pledgeReducer';
import currenciesReducer from './currenciesReducer';
import paymentStatusReducer from './paymentStatus';

const commonReducers = {
  entities: entitiesReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  userFeeds: userFeedReducer,
  pledges: fetchPledgesReducer,
  currencies: currenciesReducer,
  paymentStatus: paymentStatusReducer
};

export default commonReducers;
