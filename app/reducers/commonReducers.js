import entitiesReducer from './entitiesReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';
import userFeedReducer from './userFeedReducer';
import fetchPledgesReducer from './pledgeReducer';
import currenciesReducer from './currenciesReducer';
import currencyReducer from './currencyReducer';
import configReducer from './configReducer';
import paymentStatusReducer from './paymentStatus';
import modelDialogReducer from './modelDialogReducer';
import contentloaderReducer from './contentloaderReducer';

import pledgeEventReducer from './pledgeEventReducer';
import updateLastRouteReducer from './updateLastRouteReducer';
import competitionDetailReducer from '../components/Competition/redux/competitionDetailReducer';

import competitionsReducer from '../components/Competition/redux/competitionsReducer';

const commonReducers = {
  entities: entitiesReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  userFeeds: userFeedReducer,
  pledges: fetchPledgesReducer,
  currencies: currenciesReducer,
  currency: currencyReducer,
  cdnMedia: configReducer,
  paymentStatus: paymentStatusReducer,
  modelDialogState: modelDialogReducer,
  contentloaderState: contentloaderReducer,
  pledgeEvents: pledgeEventReducer,
  lastRouteState: updateLastRouteReducer,
  competitionDetail: competitionDetailReducer,
  competitionsReducer
};

export default commonReducers;
