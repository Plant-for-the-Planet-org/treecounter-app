import React, { Component } from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  pledge_highest,
  pledge_latest,
  nextArrow,
  nextArrowWhite,
  closeBlack
} from '../../assets';
import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
import { getDocumentTitle } from '../../helpers/utils';
import { delimitNumbers } from '../../utils/utils';
import Pulse from 'react-reveal/Pulse'; // Not being used currently
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
      loadUserPledges: true,
      myPledge: {},
      updatingTreeCount: ''
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
          if (
            this.props.pledges &&
            this.props.pledges.allEventPledges &&
            this.props.pledges.allEventPledges.length > 0
          ) {
            if (typeof this.props.entities.eventPledge !== 'undefined') {
              let userPledges = Object.values(this.props.entities.eventPledge); // convert object to array
              let myPledge = userPledges.filter(pledge => {
                return this.props.pledges.allEventPledges.some(f => {
                  return f.token === pledge.token && f.email === pledge.email;
                });
              });
              this.setState({
                myPledge: myPledge,
                loadUserPledges: false
              });
            }
          }
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

  // Functions for Increase/Update Pledge Modal
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
    setTimeout(window.location.reload.bind(window.location), 3000);
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  onFormSubmit() {
    let value = this.refs.pledgeForm.getValue();
    if (value) {
      this.props.postPledge(value);
      this.closePledgeModal();
      setTimeout(this.openSubmitPledgeModal(), 1000);
    }
  }

  changeTreeCount = e => {
    this.setState({
      updatingTreeCount: e.target.value
    });
  };

  onUpdatePledgeSubmit = event => {
    event.preventDefault();
    const treeCount = this.state.updatingTreeCount;
    const data = {
      treeCount: treeCount
    };
    this.props.updatePledge(
      data,
      {
        token: this.state.myPledge[0].token,
        version: 'v1.3'
      },
      this.state.loggedIn
    );
    this.closeIncreasePledgesModal();
    setTimeout(window.location.reload.bind(window.location), 3000);
  };

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

    const { myPledge } = this.state;

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
                          {i18n.t(pledge.treeCount.toLocaleString())}
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
                    onClick={this.openAllPledgesModal}
                    className="pledges-header-icon"
                  />
                </div>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    this.props.pledges.highestPledgeEvents.map(pledge => (
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
                          {i18n.t(pledge.treeCount.toLocaleString())}
                        </span>
                      </div>
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
                  <p className="event-description-header">
                    {i18n.t('label.eventDescriptionAbout')}
                  </p>
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
                  {i18n.t('label.donateXTrees', {
                    treeCount: delimitNumbers(parseInt(myPledge[0].treeCount))
                  })}
                </Link>
                <p
                  className="increase-pledge-button"
                  onClick={this.openIncreasePledgesModal}
                >
                  {i18n.t('label.increaseMyPledge')}
                </p>
              </div>
              <div className="buttons-mobileview">
                <div className="buttons-mobileview-container">
                  <div className="left-buttons">
                    <div className="trees-pledged">
                      {i18n.t('label.treesPledgedAllPledges', {
                        treeCount: myPledge[0].treeCount.toLocaleString()
                      })}
                    </div>
                    <div
                      className="increase-button"
                      onClick={this.openIncreasePledgesModal}
                    >
                      {i18n.t('label.increaseMyPledge')}
                    </div>
                  </div>
                  <Link
                    className="right-buttons"
                    to={getLocalRoute('app_donateTrees')}
                  >
                    <img src={nextArrowWhite} className="forward-arrow" />
                    <div className="donate-text">{i18n.t('label.donate')}</div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="make-pledge-button" onClick={this.openPledgeModal}>
              {i18n.t('label.makePledgeButton')}
            </p>
          )}

          {/* Modal for Making a pledge */}
          <Modal
            isOpen={this.state.pledgeModalIsOpen}
            onRequestClose={this.closePledgeModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="pledge-content"
          >
            <div className="make-pledge-form-x">
              <span onClick={this.closePledgeModal}>
                <img src={closeBlack} className="close-button" />
              </span>
            </div>
            <div className="make-pledge-form-header">
              <p>{i18n.t('label.pledgeToPlant')}</p>
            </div>
            <div className="make-pledge-form-para">
              {this.props.pledges && this.props.pledges.allEventPledges ? (
                <p>
                  {i18n.t('label.pledgeToPlantDesc', {
                    treeCost: this.props.pledges.plantProject.treeCost,
                    currency: this.props.pledges.plantProject.currency,
                    projectName: this.props.pledges.plantProject.name
                  })}
                </p>
              ) : null}
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

          {/* Modal for showing all the pledges  */}
          <Modal
            isOpen={this.state.AllPledgesModalIsOpen}
            onRequestClose={this.closeAllPledgesModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="pledge-content"
          >
            <div className="all-pledges">
              <div className="make-pledge-form-x">
                <span onClick={this.closeAllPledgesModal}>
                  <img src={closeBlack} className="close-button" />
                </span>
              </div>
              <div className="all-pledges-table">
                <p className="all-pledges-title">
                  {i18n.t('label.allPledges')}
                </p>
                <p className="all-pledges-subtitle">
                  {i18n.t('label.treesPledgedOn')} {selectedPledge.name}
                </p>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    // sort by value
                    this.props.pledges.allEventPledges.sort(function(a, b) {
                      return b.treeCount - a.treeCount;
                    }),
                    this.props.pledges.allEventPledges.map(pledge => (
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
                          {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                        </span>
                      </div>
                    )))
                  }
                </div>
              </div>
            </div>
          </Modal>
          {/* Modal for showing all the pledges ended */}

          {/* Modal for showing increase pledge form  */}
          {typeof myPledge !== 'undefined' && myPledge.length > 0 ? (
            <Modal
              isOpen={this.state.IncreasePledgesModalIsOpen}
              onRequestClose={this.closeIncreasePledgesModal}
              contentLabel="Pledge Modal"
              overlayClassName="pledge-overlay"
              className="pledge-content"
            >
              <div className="make-pledge-form-x">
                <span onClick={this.closeIncreasePledgesModal}>
                  <img src={closeBlack} className="close-button" />
                </span>
              </div>
              <div className="make-pledge-form-header">
                <p>{i18n.t('label.increasePledge')}</p>
              </div>
              <div className="make-pledge-form-para">
                <p>
                  {'To increase your pledge, please enter an amount higher than ' +
                    myPledge[0].treeCount +
                    ' trees. A tree costs ' +
                    myPledge[0].plantProjectTreeCost +
                    ' ' +
                    myPledge[0].plantProjectCurrency +
                    ' and are planted in ' +
                    myPledge[0].plantProjectName}
                </p>
              </div>

              <form onSubmit={this.onUpdatePledgeSubmit}>
                <input
                  value={this.state.updatingTreeCount}
                  onChange={this.changeTreeCount}
                  type="number"
                  placeholder="Tree Count"
                  min={myPledge[0].treeCount}
                />
                <input
                  type="submit"
                  //onClick={() => this.onUpdatePledgeSubmit(myPledge[0].token)}
                  className="make-pledge-button-form"
                  value="Update Pledge"
                />
              </form>
            </Modal>
          ) : null}
          {/* Modal for showing increase pledge form  */}

          {/* Modal for showing Later Continue option  */}
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
                  {i18n.t('label.pledgeAddedMessage', {
                    treeCount: this.state.value.treeCount
                  })}
                </p>
              </div>
              <div className="submit-pledge-buttons">
                <div
                  onClick={this.closeSubmitPledgeModal}
                  className="submit-pledge-later-button"
                >
                  {i18n.t('label.pledgeAddedLaterButton')}
                </div>
                <Link
                  to={getLocalRoute('app_donateTrees')}
                  className="submit-pledge-donate-button"
                >
                  {i18n.t('label.pledgeAddedContinueButton')}
                </Link>
              </div>
            </div>
          </Modal>
          {/* Modal for showing Later Continue option ended  */}
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
