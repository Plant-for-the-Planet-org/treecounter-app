import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import Map from '../Common/EsriMap/Map';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const UserContributions = ({ userContributions }) => {
  let mPins = userContributions.map(element => {
    let color = '';
    if (
      element.contributionType ===
      i18n.t('label.userContributionslabels.donated', { lng })
    )
      color = i18n.t('label.userContributionslabels.green', { lng });
    else if (element.treeCount > 1)
      color = i18n.t('label.userContributionslabels.blue', { lng });
    else color = i18n.t('label.userContributionslabels.orange', { lng });
    return {
      lat: element.geoLatitude,
      long: element.geoLongitude,
      color: color
    };
  });

  return (
    <div className="app-container__content--center sidenav-wrapper">
      <TextHeading>
        {i18n.t('label.userContributionslabels.my_trees', { lng })}
      </TextHeading>
      <CardLayout>
        {Object.keys(userContributions).length > 0 ? (
          <div>
            <Map pins={mPins} />
            <ContributionsMapLegend />
            <div className="contribution-container">
              <ContributionCardList contributions={userContributions} />
            </div>
            <div className="contribution-buttons">
              <InlineLink
                caption={i18n.t(
                  'label.userContributionslabels.register_further',
                  { lng }
                )}
                uri={'app_registerTrees'}
              />
              <InlineLink
                caption={i18n.t('label.userContributionslabels.donate_trees', {
                  lng
                })}
                uri={'app_donateTrees'}
              />
            </div>
          </div>
        ) : (
          <div className="sidenav-wrapper">
            <div className="registeration-successfull">
              {i18n.t('label.userContributionslabels.no_contributions', {
                lng
              })}
            </div>
          </div>
        )}
      </CardLayout>
    </div>
  );
};

UserContributions.propTypes = {
  userContributions: PropTypes.array.isRequired
};

export default UserContributions;
