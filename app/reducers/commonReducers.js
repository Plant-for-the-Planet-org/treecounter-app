import donationsReducer from './../components/DonateTrees/redux/reducer';
import configReducer from './configReducer';
import contentloaderReducer from './contentloaderReducer';
import currenciesReducer from './currenciesReducer';
import currencyReducer from './currencyReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import entitiesReducer from './entitiesReducer';
import modelDialogReducer from './modelDialogReducer';
import paymentStatusReducer from './paymentStatus';
import pledgeEventReducer from './pledgeEventReducer';
import fetchPledgesReducer from './pledgeReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';
import updateLastRouteReducer from './updateLastRouteReducer';
import userFeedReducer from './userFeedReducer';
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
  donations: donationsReducer,
  competitionsReducer
};

export default commonReducers;
