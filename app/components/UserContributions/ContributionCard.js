import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getLocalRoute } from '../../actions/apiRouting';
import TextSpan from '../Common/Text/TextSpan';
import ConfirmDeletion from './ConfirmDelete';
import { updateRoute } from '../../helpers/routerHelper';
import { formatDate, delimitNumbers } from '../../utils/utils';
import i18n from '../../locales/i18n.js';

export default class ContributionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      viewExpanded: false,
      openDialog: false
    };
  }

  closeLightbox = () => this.setState({ lightboxIsOpen: false });

  openLightbox = () => this.setState({ lightboxIsOpen: true });

  gotoPrevious = () =>
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  gotoNext = () =>
    this.setState({
      currentImage: this.state.currentImage + 1
    });

  onViewExpanded = () =>
    this.setState({
      viewExpanded: !this.state.viewExpanded
    });
  treeCountLine(treeCount, treeSpecies) {
    return delimitNumbers(treeCount) + ' ' + (treeSpecies ? treeSpecies : '');
  }

  plantProjectLine(plantProjectName, country) {
    return (plantProjectName ? plantProjectName + ', ' : '') + country;
  }

  donateActionLine(isGift, plantDate, givee, giveeSlug) {
    return isGift
      ? [
          <TextSpan key={`donateActionLine_0`}>
            {i18n.t('label.gifted_on_to', {
              date: formatDate(plantDate)
            })}
          </TextSpan>,
          <TextSpan
            key={`donateActionLine_1`}
            onPress={() =>
              updateRoute(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug
              })
            }
          >
            {givee}
          </TextSpan>
        ]
      : i18n.t('label.donated_on', {
          date: formatDate(plantDate)
        });
  }

  tpoLine(tpoName) {
    return tpoName ? i18n.t('label.planted_by', { tpo: tpoName }) : '';
  }

  plantActionLine(plantDate, registrationDate) {
    return (
      i18n.t('label.planted_on', {
        date: formatDate(plantDate)
      }) +
      ', ' +
      i18n.t('label.added_on', {
        date: formatDate(registrationDate)
      })
    );
  }

  dedicateActionLine(isGift, givee, giveeSlug) {
    return isGift
      ? [
          <TextSpan key={`dedicateActionLine_0`}>
            {i18n.t('label.dedicated_to')}
          </TextSpan>,
          <TextSpan
            key={`dedicateActionLine_1`}
            onPress={() =>
              updateRoute(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug
              })
            }
          >
            {' ' + givee}
          </TextSpan>
        ]
      : '';
  }

  redeemActionLine(redemptionCode, redemptionDate, givee, giveeSlug) {
    return redemptionCode && givee
      ? [
          <TextSpan key={`redeemActionLine_0`}>
            {i18n.t('label.given_on_by', {
              date: formatDate(redemptionDate)
            })}
          </TextSpan>,
          <TextSpan
            key={`redeemActionLine_1`}
            onPress={() =>
              updateRoute(getLocalRoute('app_treecounter'), {
                treeCounterId: giveeSlug
              })
            }
          >
            {' ' + givee}
          </TextSpan>
        ]
      : redemptionCode
        ? i18n.t('label.redeemed_on', {
            date: formatDate(redemptionDate)
          })
        : givee
          ? [
              <TextSpan key={`redeemActionLine_2`}>
                {i18n.t('label.dedicated_on_by', {
                  date: formatDate(redemptionDate)
                })}
              </TextSpan>,
              <TextSpan
                key={`redeemActionLine_3`}
                onPress={() =>
                  updateRoute(getLocalRoute('app_treecounter'), {
                    treeCounterId: giveeSlug
                  })
                }
              >
                {' ' + givee}
              </TextSpan>
            ]
          : i18n.t('label.dedicated_on', {
              date: formatDate(redemptionDate)
            });
  }

  render() {
    let { contribution } = this.props;
    // let imagesArray =
    //   contribution.category === 'contributions'
    //     ? contribution.contributionImages.map(image => {
    //         return { src: getImageUrl('contribution', 'medium', image.image) };
    //       })
    //     : '';
    let seeLabel = classnames('see-more-label-style', {
      'see-more__active': this.state.viewExpanded
    });
    let {
      treeCount,
      treeSpecies,
      plantProjectName,
      country,
      isGift,
      plantDate,
      givee,
      giveeSlug,
      tpoName,
      isPending,
      mayUpdate,
      cardType,
      contributionType,
      category,
      registrationDate,
      redemptionCode,
      redemptionDate
    } = contribution;
    // let imagesArray = contribution.contributionImages.map(image => {
    //   return { src: getImageUrl('contribution', 'medium', image.image) };
    // });
    // let seeLabel = classnames('see-more-label-style', {
    //   'see-more__active': this.state.viewExpanded
    // });

    let treeCountLine = this.treeCountLine(treeCount, treeSpecies);
    let plantProjectLine = this.plantProjectLine(plantProjectName, country);
    let donateActionLine = this.donateActionLine(
      isGift,
      plantDate,
      givee,
      giveeSlug
    );
    let tpoLine = this.tpoLine(tpoName);
    let plantActionLine = this.plantActionLine(plantDate, registrationDate);
    let dedicateActionLine = this.dedicateActionLine(givee, giveeSlug);
    let redeemActionLine = this.redeemActionLine(
      redemptionCode,
      redemptionDate,
      givee,
      giveeSlug
    );
    // let labelColor = cardType === 'pending' ? '#e6e6e6' : '#95c243';
    // let borderColor =
    //   contributionType == 'donation'
    //     ? '#95c243'
    //     : treeCount > 1
    //       ? '#68aeec'
    //       : '#ec6453';
    return category === 'contributions' && contributionType === 'donation' ? (
      <div>
        <div
          style={{
            borderLeft:
              '5px solid ' +
              (contribution.contributionType == 'donation'
                ? '#95c243'
                : contribution.treeCount > 1
                  ? '#68aeec'
                  : '#ec6453')
          }}
          key={`contribution-${contribution.id}`}
          className={`contribution-container__card ${
            contribution.contributionType
          }`}
        >
          <div className="contribution-container__left-column">
            {treeCountLine ? <TextSpan strong>{treeCountLine}</TextSpan> : null}
            {plantProjectLine ? <TextSpan>{plantProjectLine}</TextSpan> : null}
            {donateActionLine ? <TextSpan>{donateActionLine}</TextSpan> : null}
            {tpoLine ? <TextSpan>{tpoLine}</TextSpan> : null}
          </div>
          <div className="contribution-container__right-column">
            {contribution.category === 'contributions'
              ? contribution.contributionMeasurements
                  .slice(0, 3)
                  .map((measurement, index) => (
                    <TextSpan key={index}>
                      {contribution.plantDate === measurement.measurementDate
                        ? i18n.t('label.planting_day')
                        : formatDate(measurement.measurementDate) +
                          (measurement.diameter + 'cm').padStart(10) +
                          (
                            (measurement.height / 100).toFixed(1) + 'm'
                          ).padStart(10)}
                    </TextSpan>
                  ))
              : null}
            {contribution.category === 'contributions' &&
            contribution.contributionMeasurements.length > 3 ? (
              <div className={seeLabel} onClick={this.onViewExpanded}>
                {this.state.viewExpanded
                  ? i18n.t('label.see_less')
                  : '+ ' + i18n.t('label.see_more')}
              </div>
            ) : null}
            {this.state.viewExpanded &&
            contribution.category === 'contributions'
              ? contribution.contributionMeasurements
                  .slice(3)
                  .map(measurement => (
                    <TextSpan key={measurement.id}>
                      {formatDate(measurement.measurementDate) +
                        (measurement.diameter + 'cm').padStart(10) +
                        ((measurement.height / 100).toFixed(1) + 'm').padStart(
                          10
                        )}
                    </TextSpan>
                  ))
              : null}
            {!isPending ? (
              <TextSpan>
                {' '}
                {cardType && cardType.length > 0
                  ? cardType.charAt(0).toUpperCase() + cardType.slice(1)
                  : ''}
              </TextSpan>
            ) : null}
            {mayUpdate ? (
              <Link
                to={getLocalRoute('app_editTrees', {
                  contribution: contribution.id
                })}
              >
                {i18n.t('label.update')}
              </Link>
            ) : null}
          </div>
        </div>
        <hr className="contribution-container__partition" />
      </div>
    ) : category === 'contributions' && contributionType === 'planting' ? (
      <div>
        <div
          style={{
            borderLeft:
              '5px solid ' +
              (contribution.contributionType == 'donation'
                ? '#95c243'
                : contribution.treeCount > 1
                  ? '#68aeec'
                  : '#ec6453')
          }}
          key={`contribution-${contribution.id}`}
          className={`contribution-container__card ${
            contribution.contributionType
          }`}
        >
          <div className="contribution-container__left-column">
            {treeCountLine ? <TextSpan strong>{treeCountLine}</TextSpan> : null}
            {plantProjectLine ? <TextSpan>{plantProjectLine}</TextSpan> : null}
            {plantActionLine ? <TextSpan>{plantActionLine}</TextSpan> : null}
            {dedicateActionLine ? (
              <TextSpan>{dedicateActionLine}</TextSpan>
            ) : null}
          </div>
          <div className="contribution-container__right-column">
            {contribution.category === 'contributions'
              ? contribution.contributionMeasurements
                  .slice(0, 3)
                  .map(measurement => (
                    <TextSpan key={measurement.id}>
                      {contribution.plantDate === measurement.measurementDate
                        ? i18n.t('label.planting_day')
                        : formatDate(measurement.measurementDate) +
                          (measurement.diameter + 'cm').padStart(10) +
                          (
                            (measurement.height / 100).toFixed(1) + 'm'
                          ).padStart(10)}
                    </TextSpan>
                  ))
              : null}
            {contribution.category === 'contributions' &&
            contribution.contributionMeasurements.length > 3 ? (
              <div className={seeLabel} onClick={this.onViewExpanded}>
                {this.state.viewExpanded
                  ? i18n.t('label.see_less')
                  : '+ ' + i18n.t('label.see_more')}
              </div>
            ) : null}
            {this.state.viewExpanded &&
            contribution.category === 'contributions'
              ? contribution.contributionMeasurements
                  .slice(3)
                  .map(measurement => (
                    <TextSpan key={measurement.id}>
                      {formatDate(measurement.measurementDate) +
                        (measurement.diameter + 'cm').padStart(10) +
                        ((measurement.height / 100).toFixed(1) + 'm').padStart(
                          10
                        )}
                    </TextSpan>
                  ))
              : null}
            {contribution.contributionType === 'planting' ? (
              <div>
                <ConfirmDeletion
                  isOpen={this.state.openDialog}
                  handleDeletion={() => {
                    this.props.deleteContribution(
                      contribution.id,
                      this.props.navigation
                    );
                    this.setState({
                      openDialog: false
                    });
                  }}
                  onRequestClose={() =>
                    this.setState({
                      openDialog: false
                    })
                  }
                />
                <div onClick={() => this.setState({ openDialog: true })}>
                  <span className="delete_style">
                    {'' + i18n.t('label.delete')}
                  </span>
                </div>
              </div>
            ) : null}
            {!isPending ? (
              <TextSpan>
                {' '}
                {cardType && cardType.length > 0
                  ? cardType.charAt(0).toUpperCase() + cardType.slice(1)
                  : ''}
              </TextSpan>
            ) : null}
            {mayUpdate ? (
              <Link
                to={getLocalRoute('app_editTrees', {
                  contribution: contribution.id
                })}
              >
                {i18n.t('label.update')}
              </Link>
            ) : null}
          </div>
        </div>
        <hr className="contribution-container__partition" />
      </div>
    ) : category === 'gifts' ? (
      <div>
        <div
          style={{
            borderLeft:
              '5px solid ' +
              (contribution.contributionType == 'donation'
                ? '#95c243'
                : contribution.treeCount > 1
                  ? '#68aeec'
                  : '#ec6453')
          }}
          key={`contribution-${contribution.id}`}
          className={`contribution-container__card ${
            contribution.contributionType
          }`}
        >
          <div className="contribution-container__left-column">
            {treeCountLine ? <TextSpan strong>{treeCountLine}</TextSpan> : null}
            {plantProjectLine ? <TextSpan>{plantProjectLine}</TextSpan> : null}
            {redeemActionLine ? <TextSpan>{redeemActionLine}</TextSpan> : null}
            {tpoLine ? <TextSpan>{tpoLine}</TextSpan> : null}
          </div>
          <div className="contribution-container__right-column">
            {contribution.category === 'contributions'
              ? contribution.contributionMeasurements
                  .slice(0, 3)
                  .map(measurement => (
                    <TextSpan key={measurement.id}>
                      {contribution.plantDate === measurement.measurementDate
                        ? i18n.t('label.planting_day')
                        : formatDate(measurement.measurementDate) +
                          (measurement.diameter + 'cm').padStart(10) +
                          (
                            (measurement.height / 100).toFixed(1) + 'm'
                          ).padStart(10)}
                    </TextSpan>
                  ))
              : null}
            {contribution.category === 'contributions' &&
            contribution.contributionMeasurements.length > 3 ? (
              <div className={seeLabel} onClick={this.onViewExpanded}>
                {this.state.viewExpanded
                  ? i18n.t('label.see_less')
                  : '+ ' + i18n.t('label.see_more')}
              </div>
            ) : null}
            {this.state.viewExpanded &&
            contribution.category === 'contributions'
              ? contribution.contributionMeasurements
                  .slice(3)
                  .map(measurement => (
                    <TextSpan key={measurement.id}>
                      {formatDate(measurement.measurementDate) +
                        (measurement.diameter + 'cm').padStart(10) +
                        ((measurement.height / 100).toFixed(1) + 'm').padStart(
                          10
                        )}
                    </TextSpan>
                  ))
              : null}
            {!isPending ? (
              <TextSpan>
                {' '}
                {cardType && cardType.length > 0
                  ? cardType.charAt(0).toUpperCase() + cardType.slice(1)
                  : ''}
              </TextSpan>
            ) : null}
            {mayUpdate ? (
              <Link
                to={getLocalRoute('app_editTrees', {
                  contribution: contribution.id
                })}
              >
                {i18n.t('label.update')}
              </Link>
            ) : null}
          </div>
        </div>
        <hr className="contribution-container__partition" />
      </div>
    ) : null;
  }
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired,
  deleteContribution: PropTypes.func
};
