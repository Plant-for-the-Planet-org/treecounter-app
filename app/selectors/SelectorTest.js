import React from 'react';
import { connect } from 'react-redux';

import { currentUserProfileSelector } from './index';
import { userTreecounterSelector } from './index';
import { userContributionsSelector } from './index';
import { sortedUserContributionsSelector } from './index';
import { selectedPlantProjectSelector } from './index';
import { availablePaymentGatewaysSelector } from './index';

import { userTreecounterDataSelector } from './index';
import { userPlantProjectsSelector } from './index';
import { sortedUserPlantProjectsSelector } from './index';
import { activePlantProjectsSelector } from './index';
import { unusedPlantProjectsSelector } from './index';
import { debug } from '../debug';

const SelectorTest = ({ state }) => {
  debug(
    'SELECTOR currentUserProfileSelector',
    currentUserProfileSelector(state)
  );
  debug('SELECTOR userTreecounterSelector', userTreecounterSelector(state));
  debug('SELECTOR userContributionsSelector', userContributionsSelector(state));
  debug(
    'SELECTOR sortedUserContributionsSelector',
    sortedUserContributionsSelector(state)
  );
  debug(
    'SELECTOR selectedPlantProjectSelector',
    selectedPlantProjectSelector(state)
  );
  debug(
    'SELECTOR availablePaymentGatewaysSelector',
    availablePaymentGatewaysSelector(state)
  );
  debug(
    'SELECTOR userTreecounterDataSelector',
    userTreecounterDataSelector(state)
  );
  debug('SELECTOR userPlantProjectsSelector', userPlantProjectsSelector(state));
  debug(
    'SELECTOR sortedUserPlantProjectsSelector',
    sortedUserPlantProjectsSelector(state)
  );
  debug(
    'SELECTOR activePlantProjectsSelector',
    activePlantProjectsSelector(state)
  );
  debug(
    'SELECTOR unusedPlantProjectsSelector',
    unusedPlantProjectsSelector(state)
  );
  return <span />;
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(SelectorTest);
