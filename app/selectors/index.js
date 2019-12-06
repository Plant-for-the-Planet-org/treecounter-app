import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import {
  userProfileSchema,
  plantProjectSchema,
  competitionPagerSchema,
  competitionSchema
} from '../schemas';
import { getCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { getUserFeeds } from '../reducers/userFeedReducer';
import {
  getPlantProjects,
  getPaymentGateways,
  getTpos,
  getCompetitionPager,
  getCompetition,
  getCompetitionEnrollment
} from '../reducers/entitiesReducer';
import { getSupportedTreecounter } from '../reducers/supportedTreecounterReducer';
import { getSelectedPlantProjectId } from '../reducers/selectedPlantProjectIdReducer';
import { getPledges } from '../reducers/pledgeReducer';
import { getPostedPledges } from '../reducers/pledgeReducer';
import { getPledgeEvents } from '../reducers/pledgeEventReducer';
import { getPaymentStatus } from '../reducers/paymentStatus';
import { getCurrencies } from '../reducers/currenciesReducer';
import { getGlobalCurrency } from '../reducers/currencyReducer';
import { getCompetitionDetail } from '../reducers/competitionDetailReducer';

export const supportedTreecounterSelector = state =>
  getSupportedTreecounter(state);
export const currentUserProfileIdSelector = state =>
  getCurrentUserProfileId(state);
export const selectedPlantProjectIdSelector = state =>
  getSelectedPlantProjectId(state);
export const paymentGatewaysSelector = state => getPaymentGateways(state);
export const tposSelector = state => getTpos(state);
export const plantProjectsSelector = state => getPlantProjects(state);
export const competitionPagerSelector = state => getCompetitionPager(state);
export const competitionSelector = state => getCompetition(state);
export const competitionEnrollmentSelector = state =>
  getCompetitionEnrollment(state);
export const entitiesSelector = state => state.entities;
export const userFeedsSelector = state => getUserFeeds(state);
export const pledgesSelector = state => getPledges(state);
export const postedPledgesSelector = state => getPostedPledges(state);
export const currenciesSelector = state => getCurrencies(state);
export const getCurrency = state => getGlobalCurrency(state);
export const paymentStatusSelector = state => getPaymentStatus(state);
export const pledgeEventSelector = state => getPledgeEvents(state);
export const selectedCompetitionIdSelector = state =>
  getCompetitionDetail(state);
function logSelectorUpdate(selectorName, args = 'None') {
  const debug = false;
  debug && console.log('SELECTOR: ' + selectorName, args);
}

/**
 * Returns the current user's de-normalized user profile (with treecounter and contributions) or null
 *
 * The current user profile is a hierarchical object which has the following structure:
 *   - the user profile entity itself with properties like firstname, lastname, email, etc.
 *   - 1 treecounter entity associated via the property treecounter_id
 *   - the treecounter has 0..n contribution child entities
 *
 * In order to get an updated, fully de-normalized user profile entity, this selector must return a new result
 * whenever one of the following state changes occur.
 *   - currentUserProfileId: someone has logged in/out
 *   - entities.userProfile: someone has logged in/out
 *   - entities.treecounter: the target has been updated
 *   - entities.contribution: a plantContribution or donationContribution has been added/updated/deleted
 *
 * As the de-normalization process requires the whole entities state, there is no point in making this selector
 * dependent on only the 3 relevant entity types above. This has the effect that the selector will produce
 * a new result whenever state.entities is modified (ANY entity is added/updated/deleted).
 */

export const getAllPlantProjectsSelector = createSelector(
  plantProjectsSelector,
  entitiesSelector,
  tposSelector,
  (plantProjects, entities, tpos) => {
    let normalisedProjects = Object.keys(plantProjects).reduce(
      (projects, id) => {
        projects.push(
          denormalize(plantProjects[id], plantProjectSchema, entities)
        );
        return projects;
      },
      []
    );
    let tpoNameExpandedProjects = normalisedProjects.map(project => {
      project.tpo_name = tpos[project.tpoId] ? tpos[project.tpoId].name : '-';
      return project;
    });
    tpoNameExpandedProjects.sort(function(a, b) {
      let nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
    return tpoNameExpandedProjects;
  }
);

// export const competitionDetailSelector = state => getCompetitionDetail(state);
export const competitionDetailSelector = createSelector(
  selectedCompetitionIdSelector,
  entitiesSelector,
  (selectedCompetitionId, entities) => {
    return null === selectedCompetitionId
      ? null
      : denormalize(
          entities.competition[selectedCompetitionId.competitionDetail],
          competitionSchema,
          entities
        );
  }
);
export const getAllCompetitionsSelector = createSelector(
  competitionPagerSelector,
  entitiesSelector,
  (competitionPager, entities) => {
    let normalisedCompetitions = Object.keys(competitionPager).reduce(
      (competitions, id) => {
        competitions.push(
          denormalize(competitionPager[id], competitionPagerSchema, entities)
        );
        return competitions;
      },
      []
    );
    return normalisedCompetitions;
  }
);

export const currentUserProfileSelector = createSelector(
  currentUserProfileIdSelector,
  entitiesSelector,
  (currentUserProfileId, entities) => {
    logSelectorUpdate('currentUserProfileSelector');
    return null === currentUserProfileId
      ? null
      : denormalize(
          entities.userProfile[currentUserProfileId],
          userProfileSchema,
          entities
        );
  }
);

/**
 * Returns the current user's de-normalized treecounter (with contributions)
 */
export const userTreecounterSelector = createSelector(
  currentUserProfileSelector,
  currentUserProfile => {
    logSelectorUpdate('userTreecounterSelector');
    return null === currentUserProfile ? null : currentUserProfile.treecounter;
  }
);

export const userChallengesSelector = createSelector(
  userTreecounterSelector,
  userTreecounter => {
    logSelectorUpdate('userChallengesSelector');
    return null === userTreecounter ? null : userTreecounter.challenges;
  }
);

/**
 * Returns the current user's de-normalized contributions or null
 * TODO: analyze whether return value null should be replace by empty array
 */
export const userContributionsSelector = createSelector(
  userTreecounterSelector,
  userTreecounter => {
    logSelectorUpdate('userContributionsSelector');
    return null === userTreecounter ? null : userTreecounter.contributions;
  }
);

/**
 * Returns the current user's de-normalized gifts or null
 * TODO: analyze whether return value null should be replace by empty array
 */
export const userGiftsSelector = createSelector(
  userTreecounterSelector,
  userTreecounter => {
    return null === userTreecounter ? null : userTreecounter.gifts;
  }
);
export const userCompetitionEnrolledSelector = createSelector(
  userTreecounterSelector,
  userTreecounter => {
    return null === userTreecounter
      ? null
      : userTreecounter.competitionEnrollments;
  }
);
/**
 * Returns the contributions associated with the current user's treecounter sorted by date or null
 */
export const sortedUserContributionsSelector = createSelector(
  userContributionsSelector,
  userGiftsSelector,
  (contributions, gifts) => {
    let newContributions = [];
    if (contributions !== null && gifts !== null) {
      for (let i = 0; i < contributions.length; i++) {
        contributions[i].category = 'contributions';
        newContributions.push(contributions[i]);
      }
      for (let i = 0; i < gifts.length; i++) {
        gifts[i].category = 'gifts';
        newContributions.push(gifts[i]);
      }
    }

    let returnContributions = [];
    if (null !== contributions) {
      if (null === gifts) {
        returnContributions = contributions.sort(
          (c1, c2) => Date.parse(c2.plantDate) - Date.parse(c1.plantDate)
        );
      } else {
        returnContributions = newContributions.sort(
          (c1, c2) => Date.parse(c2.plantDate) - Date.parse(c1.plantDate)
        );
      }
    }
    return returnContributions;
  }
);

/**
 * Returns the plant project, currently selected by the user, in normalized form.
 */
export const selectedPlantProjectSelector = createSelector(
  selectedPlantProjectIdSelector,
  entitiesSelector,
  (selectedPlantProjectId, entities) => {
    logSelectorUpdate('selectedPlantProjectSelector');
    return null === selectedPlantProjectId
      ? null
      : denormalize(
          entities.plantProject[selectedPlantProjectId],
          plantProjectSchema,
          entities
        );
  }
);

/**
 * Returns the plant project, currently selected by the user, in normalized form.
 */
export const selectedReviewsSelector = createSelector(
  selectedPlantProjectIdSelector,
  entitiesSelector,
  (selectedPlantProjectId, entities) => {
    logSelectorUpdate('selectedReviewsSelector');
    return null === selectedPlantProjectId
      ? null
      : //denormalize(
        Object.values(entities.reviews).filter(
          review => review.plantProjectId === selectedPlantProjectId
        );
    //reviewsSchema,
    // entities
    // )
  }
);
/**
 * Returns the TPO that corresponds to the currently selected plant project
 */
export const selectedTpoSelector = createSelector(
  selectedPlantProjectSelector,
  getTpos,
  (selectedPlantProject, tpos) => {
    logSelectorUpdate('selectedTpoSelector');
    if (selectedPlantProject) {
      if (Object.keys(tpos).length) {
        return tpos[selectedPlantProject.tpoId];
      }
    }
    return null;
  }
);

/**
 * Returns an array of normalized payment gateway entities related to the currently selected plant project or null.
 *
 * Available payment gateways depend on the TPO a payment should be issued to. The TPO is determined by
 * the currently selected plant project.
 * The returned payment gateway entities are not being de-normalized as there is no relevant associated data.
 */
export const availablePaymentGatewaysSelector = createSelector(
  selectedPlantProjectSelector,
  paymentGatewaysSelector,
  (selectedPlantProject, paymentGateways) => {
    logSelectorUpdate('availablePaymentGatewaysSelector');
    return null === selectedPlantProject
      ? null
      : paymentGateways.filter(function(paymentGateway) {
          return paymentGateway.tpoId === selectedPlantProject.tpoId;
        });
  }
);

/**
 * Returns the current user's treecounter information required to render the graphical component
 */
export const userTreecounterDataSelector = createSelector(
  userTreecounterSelector,
  treecounter => {
    logSelectorUpdate('userTreecounterDataSelector');
    return null === treecounter
      ? null
      : {
          id: treecounter.id,
          target: treecounter.countTarget,
          implicitTarget: treecounter.implicitTarget,
          planted: treecounter.countPlanted,
          personal: treecounter.countPersonal,
          community: treecounter.countReceived,
          targetComment: treecounter.targetComment,
          targetYear: treecounter.targetYear
        };
  }
);

/**
 * Selects all plantProjects the current user has used (in one of his donations)
 */
export const userPlantProjectsSelector = createSelector(
  currentUserProfileSelector,
  plantProjectsSelector,
  sortedUserContributionsSelector,
  (currentUserProfile, plantProjects, sortedUserContributions) => {
    logSelectorUpdate('userPlantProjectsSelector');
    if (null === currentUserProfile) {
      return [];
    }
    // filter for donations only, get id of associated plant project, use spread on Set to make ids unique
    const userPlantProjectIds = [
      ...new Set(
        sortedUserContributions
          .filter(contribution => 'donation' === contribution.contributionType)
          .map(contribution => contribution.plantProjectId)
      )
    ];

    return Object.values(plantProjects).filter(plantProject =>
      userPlantProjectIds.includes(plantProject.id)
    );
  }
);

/**
 * Selects all plantProjects the current user has used (in one of his donations) sorted by creation date (desc)
 */
export const sortedUserPlantProjectsSelector = createSelector(
  userPlantProjectsSelector,
  plantProjects => {
    logSelectorUpdate('sortedUserPlantProjectsSelector');
    return null === plantProjects
      ? null
      : Object.values(plantProjects).sort(
          (p1, p2) => Date.parse(p2.created) - Date.parse(p1.created)
        );
  }
);

/**
 * Selects all active and verified plantProjects
 * @returns {Array.<*>}
 */
export const activePlantProjectsSelector = createSelector(
  plantProjectsSelector,
  tposSelector,
  (plantProjects, tpos) => {
    logSelectorUpdate('activePlantProjectsSelector');
    return Object.values(plantProjects).filter(plantProject => {
      let tpo = tpos[plantProject.tpoId];
      return (
        plantProject.isVerified &&
        plantProject.isActive &&
        tpo.isVerified &&
        tpo.isActive
      );
    });
  }
);

/**
 * Selects all active and verified plantProjects that have not been used previously by the current user
 */
export const unusedPlantProjectsSelector = createSelector(
  userPlantProjectsSelector,
  activePlantProjectsSelector,
  (userProjects, allActiveProjects) => {
    logSelectorUpdate('currentUserProfileSelector');
    if (null === userProjects || 0 === userProjects.length) {
      return allActiveProjects;
    }
    const userProjectIds = Object.values(userProjects).map(
      project => project.id
    );
    return Object.values(allActiveProjects).filter(
      project => false === userProjectIds.includes(project.id)
    );
  }
);
