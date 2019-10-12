import React, { Component } from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  pledge_highest,
  pledge_latest,
  nextArrow,
  nextArrowWhite
} from '../../assets';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import { getDocumentTitle } from '../../helpers/utils';
import { delimitNumbers } from '../../utils/utils';
import Pulse from 'react-reveal/Pulse';
import Modal from 'react-modal';
import { fetchItem } from './../../stores/localStorage';
import {
  pledgeFormSchema,
  pledgeSchemaOptions
} from '../../server/parsedSchemas/pledge';
import i18n from '../../locales/i18n';

let TCombForm = t.form.Form;

const formLayout = locals => {
  return (
    <div className="pledge-form-layout pledge-form">
      <div className="row">
        <div className="half">{locals.inputs.firstname}</div>
        <div className="half">{locals.inputs.lastname}</div>
      </div>
      <div>{locals.inputs.email}</div>
      <div className="tree-count">{locals.inputs.treeCount}</div>
      <div>{locals.inputs.isAnonymous}</div>
    </div>
  );
};

const allSchemaOptions = {
  template: formLayout,
  ...pledgeSchemaOptions
};

export default class Pledge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      pledgeModalIsOpen: false, // Make a pledge Modal
      AllPledgesModalIsOpen: false, // All pledge modal
      IncreasePledgesModalIsOpen: false, // Increase pledge Modal
      SubmitPledgeModalIsOpen: false, // Submit pledge Modal
      loggedIn: false,
      userPledges: [],
      loadUserPledges: true
    };
  }

  componentDidMount() {
    if (this.props.currentUserProfile) {
      this.setState({
        loggedIn: true
      });
    } else {
      fetchItem('pledgedEvent').then(data => {
        if (typeof data !== 'undefined' && data.length > 0) {
          let stringPledges = JSON.parse(data);
          stringPledges = stringPledges.toString();
          this.props.fetchPublicPledgesAction(stringPledges);
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.loadUserPledges) {
      if (this.props.entities) {
        if (this.props.entities.eventPledge) {
          this.setState({
            userPledges: this.props.entities.eventPledge,
            loadUserPledges: false
          });
        }
      }
    }
  }

  // Functions for Make a Pledge Form Modal
  openPledgeModal = () => {
    this.setState({ pledgeModalIsOpen: true });
  };
  closePledgeModal = () => {
    this.setState({ pledgeModalIsOpen: false });
  };

  // Functions for Getting All Pledges Modal
  openAllPledgesModal = () => {
    this.setState({ AllPledgesModalIsOpen: true });
  };
  closeAllPledgesModal = () => {
    this.setState({ AllPledgesModalIsOpen: false });
  };

  // Functions for Increase Pledge Modal
  openIncreasePledgesModal = () => {
    this.setState({ IncreasePledgesModalIsOpen: true });
  };
  closeIncreasePledgesModal = () => {
    this.setState({ IncreasePledgesModalIsOpen: false });
  };

  // Functions for Submit Pledge Modal
  openSubmitPledgeModal = () => {
    this.setState({ SubmitPledgeModalIsOpen: true });
  };
  closeSubmitPledgeModal = () => {
    this.setState({ SubmitPledgeModalIsOpen: false });
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  onFormSubmit() {
    let value = this.refs.pledgeForm.getValue();
    if (value) {
      this.props.postPledge(value);
      this.openSubmitPledgeModal();
      this.closePledgeModal();
    }
  }

  render() {
    let selectedPledge = {};
    if (
      this.props.pledgeEvents &&
      this.props.pledgeEvents.pledgeEvents.length > 0
    ) {
      selectedPledge = this.props.pledgeEvents.pledgeEvents.filter(
        val => val.slug === this.props.eventSlug
      )[0];
    }
    document.title = getDocumentTitle(selectedPledge.name);
    let i;

    let myPledge = {};
    if (
      this.props.pledges &&
      this.props.pledges.allEventPledges &&
      this.props.pledges.allEventPledges.length > 0
    ) {
      if (typeof this.state.userPledges !== 'undefined') {
        let userPledges = Object.values(this.state.userPledges); // convert object to array
        myPledge = userPledges.filter(pledge => {
          return this.props.pledges.allEventPledges.some(f => {
            return f.token === pledge.token && f.email === pledge.email;
          });
        });
      }
    }

    return this.props.pledges && this.props.pledges.total !== undefined ? (
      <div className="sidenav-wrapper app-container__content--center">
        <div className="conference_heading">
          <div className="esri_logo_background">
            <img src={getImageUrl('event', 'thumb', selectedPledge.image)} />
          </div>
          {selectedPledge.name}
          <br />
          <span className="total_number">
            {delimitNumbers(parseInt(this.props.pledges.total))}{' '}
            {i18n.t('label.treesPledged')}
          </span>
        </div>

        <div className="pledge_content--center">
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
                    onClick={this.openAllPledgesModal}
                    className="pledges-header-icon"
                  />
                </div>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    this.props.pledges.latestPledgeEvents.map(pledge => (
                      <Pulse key={pledge.id}>
                        <div className={'row-list-item '}>
                          <span>
                            <span className="row-list-item-rank">{i++}</span>
                            <span className="row-list-item-name">
                              {pledge.isAnonymous
                                ? 'Anonymous'
                                : pledge.firstname + ' ' + pledge.lastname}
                            </span>
                          </span>
                          <span className="row-list-item-treeCount">
                            {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                            {/* <span
                              style={{
                                fontSize: 10,
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontWeight: 'normal',
                                marginLeft: 4
                              }}
                            >
                              trees
                            </span> */}
                          </span>
                        </div>
                      </Pulse>
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
                    onClick={this.openAllPledgesModal}
                    className="pledges-header-icon"
                  />
                </div>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    this.props.pledges.highestPledgeEvents.map(pledge => (
                      <Pulse key={pledge.id}>
                        <div
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
                                ? 'Anonymous'
                                : pledge.firstname + ' ' + pledge.lastname}
                            </span>
                          </span>
                          <span className="row-list-item-treeCount">
                            {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                            {/* <span
                              style={{
                                fontSize: 10,
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontWeight: 'normal',
                                marginLeft: 4
                              }}
                            >
                              trees
                            </span> */}
                          </span>
                        </div>
                      </Pulse>
                    )))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="event-description-col">
              {this.props.pledges.description ? (
                <div className="event-description">
                  <p className="event-description-header">About</p>
                  <p>{i18n.t(this.props.pledges.description)}</p>
                </div>
              ) : null}
            </div>
            <div className="event-description-col">
              <div className="event-gallery">
                {this.props.pledges &&
                this.props.pledges.pledgeEventImages &&
                this.props.pledges.pledgeEventImages.length > 0
                  ? this.props.pledges.pledgeEventImages.map(
                      (pledgeImage, index) => (
                        <img
                          key={`pledgeImage-${index}`}
                          src={getImageUrl(
                            'eventGallery',
                            'default',
                            pledgeImage.image
                          )}
                        />
                      )
                    )
                  : null}
              </div>
            </div>
          </div>

          {typeof myPledge !== 'undefined' && myPledge.length > 0 ? (
            <div className="donate-increase-div">
              <div className="buttons-webview">
                <Link
                  className="donate-pledge-button"
                  to={getLocalRoute('app_donateTrees')}
                >
                  Donate {myPledge[0].treeCount} trees
                </Link>
                <p
                  className="increase-pledge-button"
                  onClick={this.openIncreasePledgesModal}
                >
                  + Increase my Pledge
                </p>
              </div>
              <div className="buttons-mobileview">
                <div className="buttons-mobileview-container">
                  <div className="left-buttons">
                    <div className="trees-pledged">
                      {myPledge[0].treeCount} trees Pledges
                    </div>
                    <div
                      className="increase-button"
                      onClick={this.openIncreasePledgesModal}
                    >
                      + Increase my Pledge{' '}
                    </div>
                  </div>
                  <Link
                    className="right-buttons"
                    to={getLocalRoute('app_donateTrees')}
                  >
                    <img src={nextArrowWhite} className="forward-arrow" />
                    <div className="donate-text">Donate</div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="make-pledge-button" onClick={this.openPledgeModal}>
              Make a pledge
            </p>
          )}

          <Modal
            isOpen={this.state.pledgeModalIsOpen}
            onRequestClose={this.closePledgeModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="pledge-content"
          >
            <div className="make-pledge-form-x">
              <span onClick={this.closePledgeModal}>x</span>
            </div>
            <div className="make-pledge-form-header">
              <p>Pledge to Plant Trees</p>
            </div>
            <div className="make-pledge-form-para">
              <p>
                A tree costs 1 EUR and are planted in Yucatan Reforestation. You
                will receive an email with a link to fulfill your pledge.
              </p>
            </div>
            <TCombForm
              ref="pledgeForm"
              type={pledgeFormSchema}
              options={allSchemaOptions}
              value={this.state.value}
              onChange={value => this.onFormChange(value)}
            />
            <div
              onClick={() => this.onFormSubmit()}
              className="make-pledge-button-form"
            >
              {i18n.t('label.pledge')}
            </div>
          </Modal>

          <Modal
            isOpen={this.state.AllPledgesModalIsOpen}
            onRequestClose={this.closeAllPledgesModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="pledge-content"
          >
            <div className="all-pledges">
              <div className="make-pledge-form-x">
                <span onClick={this.closeAllPledgesModal}>x</span>
              </div>
              <div className="all-pledges-table">
                <p className="all-pledges-title">All Pledges</p>
                <p className="all-pledges-subtitle">
                  List of Trees Pledged on {selectedPledge.name}
                </p>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    this.props.pledges.allEventPledges.map(pledge => (
                      <Pulse key={pledge.id}>
                        <div className={'row-list-item '}>
                          <span>
                            <span className="row-list-item-rank">{i++}</span>
                            <span className="row-list-item-name">
                              {pledge.isAnonymous
                                ? 'Anonymous'
                                : pledge.firstname + ' ' + pledge.lastname}
                            </span>
                          </span>
                          <span className="row-list-item-treeCount">
                            {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                          </span>
                        </div>
                      </Pulse>
                    )))
                  }
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={this.state.IncreasePledgesModalIsOpen}
            onRequestClose={this.closeIncreasePledgesModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="pledge-content"
          >
            <div className="make-pledge-form-x">
              <span onClick={this.closeIncreasePledgesModal}>x</span>
            </div>
            <div className="make-pledge-form-header">
              <p>Increase Pledge</p>
            </div>
            <div className="make-pledge-form-para">
              <p>
                To increase your pledge, please enter an amount higher than 150
                trees. A tree costs 1 EUR and are planted in Yucatan
                Reforestation.
              </p>
            </div>
            <TCombForm
              ref="pledgeForm"
              type={pledgeFormSchema}
              options={allSchemaOptions}
              value={this.state.value}
              onChange={value => this.onFormChange(value)}
            />
            <div
              onClick={() => this.onFormSubmit()}
              className="make-pledge-button-form"
            >
              Update Pledge
            </div>
          </Modal>

          <Modal
            isOpen={this.state.SubmitPledgeModalIsOpen}
            onRequestClose={this.closeSubmitPledgeModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="submit-pledge-buttons-modal"
          >
            <div className="submit-pledge-container">
              <div className="submit-pledge-form-para">
                <p>
                  You’ve pledged to plant {this.state.value.treeCount} Trees.
                  You can tap continue to fulfill your pledge right now.
                </p>
              </div>
              <div className="submit-pledge-buttons">
                <div
                  onClick={this.closeSubmitPledgeModal}
                  className="submit-pledge-later-button"
                >
                  LATER
                </div>
                <Link
                  to={getLocalRoute('app_donateTrees')}
                  className="submit-pledge-donate-button"
                >
                  CONTINUE
                </Link>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    ) : null;
  }
}

Pledge.propTypes = {
  pledges: PropTypes.object,
  eventSlug: PropTypes.string,
  postPledge: PropTypes.func,
  pledgeEvents: PropTypes.any,
  currentUserProfile: PropTypes.any
};
