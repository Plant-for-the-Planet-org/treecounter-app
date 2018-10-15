import entitiesReducer from './entitiesReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';
import userFeedReducer from './userFeedReducer';
import fetchPledgesReducer from './pledgeReducer';
import currenciesReducer from './currenciesReducer';
import paymentStatusReducer from './paymentStatus';
import modelDialogReducer from './modelDialogReducer';
import pledgeEventReducer from './pledgeEventReducer';
import redemptionReducer from './redemptionReducer';

const commonReducers = {
  entities: entitiesReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  userFeeds: userFeedReducer,
  pledges: fetchPledgesReducer,
  currencies: currenciesReducer,
  paymentStatus: paymentStatusReducer,
  modelDialogState: modelDialogReducer,
  pledgeEvents: pledgeEventReducer,
  validateCodeInfo: redemptionReducer
};

export default commonReducers;
