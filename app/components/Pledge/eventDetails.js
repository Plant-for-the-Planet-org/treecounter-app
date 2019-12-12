import React from 'react';
import { nextArrow } from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';
import { delimitNumbers } from '../../utils/utils';

export function EventHeaderDetails(props) {
  let selectedPledge = props.selectedPledge;
  return (
    <div>
      <div className="conference_heading">
        <div className="esri_logo_background">
          <img src={getImageUrl('event', 'thumb', selectedPledge.image)} />
        </div>
        {selectedPledge.name}
        <br />
        <span className="total_number">
          {delimitNumbers(parseInt(selectedPledge.total))}{' '}
          {i18n.t('label.treesPledged')}
        </span>
      </div>
    </div>
  );
}

export function RecentHighestPledges(props) {
  let i;
  return (
    <div className="row">
      <div className="recent-pledges">
        <div className="recent-pledges-table">
          <div className="pledges-header">
            {/* <img src={pledge_latest} /> */}
            <span style={{ fontWeight: 'bold' }}>
              {i18n.t('label.most_recent')}
            </span>
            <img
              src={nextArrow}
              onClick={props.openAllPledgesModal}
              className="pledges-header-icon"
            />
          </div>
          <div className="pledges-list">
            {
              ((i = 1),
              props.pledges.latestPledgeEvents.map(pledge => (
                <div className={'row-list-item '} key={pledge.id}>
                  <span>
                    <span className="row-list-item-rank">{i++}</span>
                    <span className="row-list-item-name">
                      {pledge.isAnonymous
                        ? i18n.t('label.anonymous')
                        : pledge.firstname + ' ' + pledge.lastname}
                    </span>
                  </span>
                  <span className="row-list-item-treeCount">
                    {i18n.t(delimitNumbers(pledge.treeCount))}
                  </span>
                </div>
              )))
            }
          </div>
        </div>
      </div>

      <div className="recent-pledges">
        <div className="recent-pledges-table">
          <div className="pledges-header">
            {/* <img src={pledge_highest} /> */}
            <span style={{ fontWeight: 'bold' }}>
              {i18n.t('label.biggest_pledges')}
            </span>
            <img
              src={nextArrow}
              onClick={props.openAllPledgesModal}
              className="pledges-header-icon"
            />
          </div>
          <div className="pledges-list">
            {
              ((i = 1),
              props.pledges.highestPledgeEvents.map(pledge => (
                <div
                  key={pledge.id}
                  className={
                    i == 1
                      ? 'row-list-item row-gold'
                      : 'row-list-item ' && i == 2
                        ? 'row-list-item row-silver'
                        : 'row-list-item ' && i == 3
                          ? 'row-list-item row-bronze'
                          : 'row-list-item '
                  }
                >
                  <span>
                    <span className="row-list-item-rank">{i++}</span>
                    <span className="row-list-item-name">
                      {pledge.isAnonymous
                        ? i18n.t('label.anonymous')
                        : pledge.firstname + ' ' + pledge.lastname}
                    </span>
                  </span>
                  <span className="row-list-item-treeCount">
                    {/*delimitNumbers(parseInt(pledge.treeCount)) */}
                    {i18n.t(delimitNumbers(pledge.treeCount))}
                  </span>
                </div>
              )))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventDescription(props) {
  let description = props.pledges.description
    ? props.pledges.description
    : null;
  return (
    <div className="event-description-col">
      {description ? (
        <div className="event-description">
          <p className="event-description-header">
            {i18n.t('label.eventDescriptionAbout')}
          </p>
          <p>{i18n.t(description)}</p>
        </div>
      ) : null}
    </div>
  );
}

export function EventImages(props) {
  let images = props.pledges.pledgeEventImages
    ? props.pledges.pledgeEventImages
    : null;
  return (
    <div className="event-description-col">
      <div className="event-gallery">
        {images
          ? images.map((pledgeImage, index) => (
              <img
                key={`pledgeImage-${index}`}
                src={getImageUrl('eventGallery', 'default', pledgeImage.image)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
