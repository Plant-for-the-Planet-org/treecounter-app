import entitiesReducer from './entitiesReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';
import userFeedReducer from './userFeedReducer';
import fetchPledgesReducer from './pledgeReducer';
import currenciesReducer from './currenciesReducer';
import currencyReducer from './currencyReducer';
import paymentStatusReducer from './paymentStatus';
import modelDialogReducer from './modelDialogReducer';
import pledgeEventReducer from './pledgeEventReducer';
import updateLastRouteReducer from './updateLastRouteReducer';
import competitionDetailReducer from './competitionDetailReducer';

const commonReducers = {
  entities: entitiesReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  userFeeds: userFeedReducer,
  pledges: fetchPledgesReducer,
  currencies: currenciesReducer,
  currency: currencyReducer,
  paymentStatus: paymentStatusReducer,
  modelDialogState: modelDialogReducer,
  pledgeEvents: pledgeEventReducer,
  lastRouteState: updateLastRouteReducer,
  competitionDetail: competitionDetailReducer
};

export default commonReducers;
