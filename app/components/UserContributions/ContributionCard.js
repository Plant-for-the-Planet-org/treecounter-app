import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Lightbox from 'react-images';
import { Link } from 'react-router-dom';
import * as images from '../../assets';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import TextSpan from '../Common/Text/TextSpan';
import ConfirmDeletion from './ConfirmDelete';
import { updateRoute } from '../../helpers/routerHelper';
import { delimitNumbers } from '../../utils/utils';
import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../locales/i18n.js';
import { getDateFromMySQL } from '../../helpers/utils';

export default class ContributionCardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      viewExpanded: false,
      openDialog: false
    };
    moment.locale(i18n.language);
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
  cap(text) {
    return text[0].toUpperCase() + text.substr(1);
  }
  donateActionLine(isGift, plantDate, givee, giveeSlug, giftRecipient) {
    return isGift && giftRecipient ? (
      <div
        onClick={() =>
          updateRoute(getLocalRoute('app_treecounter'), {
            treeCounterId: giveeSlug
          })
        }
      >
        <img className="menu-icon icon" src={images.gift_green} />
        {i18n.t('label.gifted_to')} {giftRecipient}
      </div>
    ) : givee ? (
      <div>
        <img className="menu-icon icon" src={images.gift_green_from} />
        {i18n.t('label.dedicated_by')} {givee}
      </div>
    ) : (
      ''
    );
  }

  tpoLine(tpoName) {
    return tpoName ? i18n.t('label.planted_by', { tpo: tpoName }) : '';
  }

  plantActionLine(plantDate, registrationDate) {
    return i18n.t('label.renews_on', {
      date: moment(getDateFromMySQL(plantDate)).format('DD MMM YYYY')
    });
  }

  dedicateActionLine = (isGift, givee, giveeSlug) => {
    return isGift ? (
      <div
        onClick={() =>
          updateRoute(getLocalRoute('app_treecounter'), {
            treeCounterId: giveeSlug
          })
        }
      >
        {i18n.t('label.dedicated_to') + ' ' + givee}
      </div>
    ) : (
      ''
    );
  };

  redeemActionLine(redemptionCode, redemptionDate, givee, giveeSlug) {
    return redemptionCode && giver
      ? [
          <TextSpan>
            {i18n.t('label.given_on_by', {
              date: moment(getDateFromMySQL(redemptionDate)).format(
                'DD MMM YYYY'
              )
            })}
          </TextSpan>,
          <TextSpan
            onClick={() =>
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
            date: moment(getDateFromMySQL(redemptionDate)).format('DD MMM YYYY')
          })
        : givee
          ? [
              <TextSpan>
                {i18n.t('label.dedicated_on_by', {
                  date: moment(getDateFromMySQL(redemptionDate)).format(
                    'DD MMM YYYY'
                  )
                })}
              </TextSpan>,
              <TextSpan
                onClick={() =>
                  updateRoute(getLocalRoute('app_treecounter'), {
                    treeCounterId: giveeSlug
                  })
                }
              >
                {' ' + givee}
              </TextSpan>
            ]
          : i18n.t('label.dedicated_on', {
              date: moment(getDateFromMySQL(redemptionDate)).format(
                'DD MMM YYYY'
              )
            });
  }

  render() {
    let { contribution } = this.props;
    let imagesArray =
      contribution.category === 'contributions'
        ? contribution.contributionImages.map(image => {
            return { src: getImageUrl('contribution', 'medium', image.image) };
          })
        : '';
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
      giftRecipient,
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
      giveeSlug,
      giftRecipient
    );
    // let tpoLine = this.tpoLine(tpoName);
    let plantActionLine = this.plantActionLine(plantDate, registrationDate);
    let dedicateActionLine = this.dedicateActionLine(givee, giveeSlug);
    // let redeemActionLine = this.redeemActionLine(
    //   redemptionCode,
    //   redemptionDate,
    //   givee,
    //   giveeSlug
    // );
    return category === 'contributions' ? (
      <div key={`contrib-${contribution.id}`}>
        <div className={`card ${contribution.contributionType}`}>
          <div className="currency">
            {this.cap(contribution.contributionType)}
          </div>
          <div className="contribution-container__left-column">
            {treeCountLine ? (
              <div className="headline">
                {treeCountLine} Tree{contribution.treeCount > 1 ? 's' : ''}
              </div>
            ) : (
              ''
            )}
            {plantProjectLine ? (
              <div className="card-text">
                <img
                  className="menu-icon icon"
                  src={images.tree_outline_green}
                />
                {plantProjectLine}
              </div>
            ) : (
              ''
            )}
            <div className="bottom-with-button">
              <div className="card-text">
                {donateActionLine ? (
                  donateActionLine
                ) : dedicateActionLine ? (
                  <div>
                    {' '}
                    <img className="menu-icon icon" src={images.gift_green} />
                    {dedicateActionLine}
                  </div>
                ) : null}
                {plantActionLine ? (
                  <div>
                    <img
                      className="menu-icon icon"
                      src={images.calender_green}
                    />
                    {plantActionLine}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div>
                {contribution.contributionType === 'planting' ? (
                  <div>
                    <ConfirmDeletion
                      isOpen={this.state.openDialog}
                      handleDeletion={() => {
                        this.props.deleteContribution(contribution.id);
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
                    <span onClick={() => this.setState({ openDialog: true })}>
                      <i className="material-icons">delete_outline</i>
                    </span>
                  </div>
                ) : null}
                {mayUpdate ? (
                  <Link
                    to={getLocalRoute('app_editTrees', {
                      contribution: contribution.id
                    })}
                  >
                    <span>
                      <i className="material-icons">edit</i>
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

ContributionCardHome.propTypes = {
  contribution: PropTypes.object.isRequired,
  deleteContribution: PropTypes.func
};
