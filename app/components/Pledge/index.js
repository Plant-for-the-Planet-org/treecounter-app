import React, { Component } from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { nextArrowWhite, closeBlack } from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';
import { getDocumentTitle } from '../../helpers/utils';
import { delimitNumbers } from '../../utils/utils';
import Modal from 'react-modal';
import {
  pledgeFormSchema,
  pledgeSchemaOptions
} from '../../server/parsedSchemas/pledge';
import i18n from '../../locales/i18n';
import {
  EventHeaderDetails,
  RecentHighestPledges,
  EventImages,
  EventDescription
} from './eventDetails';
import { AllPledges, IncreasePledge, MakePledge, UpdatePledge } from './modals';
let TCombForm = t.form.Form;
import Fade from 'react-reveal/Fade';
import LoadingIndicator from '../Common/LoadingIndicator';

const formLayout = locals => {
  return (
    <div className="pledge-form-layout pledge-form">
      <div className="row">
        <div className="half">{locals.inputs.firstname}</div>
        <div className="half">{locals.inputs.lastname}</div>
      </div>
      <div>{locals.inputs.email}</div>
      <div className="tree-count">{locals.inputs.treeCount}</div>
      <div className="row pftp-newcheckbox">{locals.inputs.isAnonymous}</div>
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
      SubmitPledgeModalIsOpen: false, // Later/continue after pledge Modal
      SubmitUpdateModalIsOpen: false, //Later/continue after update pledge Modal
      loggedIn: false,
      myPledge: {},
      updatingTreeCount: '', // used while increasing tree count
      pledgeButtonDisabled: false, // To disable button until page reloads
      loading: true
    };
  }

  componentDidUpdate() {
    if (this.props.pledges && this.props.pledges.image && this.state.loading) {
      this.setState({
        loading: false
      });
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

  // Functions for Later/Continue after Pledge Modal
  openSubmitPledgeModal = () => {
    this.setState({ SubmitPledgeModalIsOpen: true });
  };
  closeSubmitPledgeModal = () => {
    this.props.fetchPledgesAction(this.props.eventSlug);
    this.setState({ SubmitPledgeModalIsOpen: false });
  };

  // Functions for Later/Continue after Update Modal
  openSubmitUpdateModal = () => {
    this.setState({ SubmitUpdateModalIsOpen: true });
  };
  closeSubmitUpdateModal = () => {
    this.props.fetchPledgesAction(this.props.eventSlug);
    this.setState({ SubmitUpdateModalIsOpen: false });
  };

  onFormChange(value) {
    this.setState({ value });
  }

  onFormSubmit() {
    let value = this.state.value;
    if (value) {
      this.props.postPledge(value);
      this.closePledgeModal();
      setTimeout(this.openSubmitPledgeModal(), 2000);
    }
  }

  changeTreeCount = e => {
    this.setState({
      updatingTreeCount: e.target.value
    });
  };

  onUpdatePledgeSubmit = (event, token) => {
    event.preventDefault();
    const data = {
      treeCount: this.state.updatingTreeCount
    };
    this.props.updatePledge(data, token);
    this.closeIncreasePledgesModal();
    this.openSubmitUpdateModal();
  };

  render() {
    let myPledge = this.props.myPledge;
    let pledges =
      this.props.pledges && this.props.pledges.total !== undefined
        ? this.props.pledges
        : null;

    if (pledges) {
      document.title = getDocumentTitle(pledges.name);
    }

    return this.state.loading ? (
      <div className="sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="sidenav-wrapper app-container__content--center">
        {pledges && pledges.name ? (
          <EventHeaderDetails selectedPledge={pledges} />
        ) : null}

        <div className="pledge_content--center">
          {pledges && pledges.name ? (
            <RecentHighestPledges
              pledges={pledges}
              openAllPledgesModal={this.openAllPledgesModal}
            />
          ) : null}

          {pledges && pledges.name ? (
            <div className="row">
              <EventDescription pledges={pledges} />
              <EventImages pledges={pledges} />
            </div>
          ) : null}

          {typeof myPledge !== 'undefined' && myPledge !== null ? (
            myPledge.length > 0 ? (
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
                      <div className="donate-text">
                        {i18n.t('label.donate')}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <input
                type="button"
                className="make-pledge-button"
                onClick={this.openPledgeModal}
                value={i18n.t('label.makePledgeButton')}
                disabled={this.state.pledgeButtonDisabled}
              />
            )
          ) : (
            <input
              type="button"
              className="make-pledge-button"
              onClick={this.openPledgeModal}
              value={i18n.t('label.makePledgeButton')}
              disabled={this.state.pledgeButtonDisabled}
            />
          )}

          {/* Modal for Making a pledge */}
          <Modal
            isOpen={this.state.pledgeModalIsOpen}
            onRequestClose={this.closePledgeModal}
            contentLabel="Pledge Modal"
            overlayClassName="pledge-overlay"
            className="pledge-content"
            appElement={document.getElementById('root')}
          >
            <Fade bottom>
              <div className="make-pledge-form-x">
                <span onClick={this.closePledgeModal}>
                  <img src={closeBlack} className="close-button" />
                </span>
              </div>
              <div className="make-pledge-form-header">
                <p>{i18n.t('label.pledgeToPlant')}</p>
              </div>
              <div className="make-pledge-form-para">
                {pledges && pledges.allEventPledges ? (
                  <p>
                    {i18n.t('label.pledgeToPlantDesc', {
                      treeCost: pledges.plantProject.treeCost,
                      currency: pledges.plantProject.currency,
                      projectName: pledges.plantProject.name
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
            </Fade>
          </Modal>

          {/* Modal for showing all the pledges  */}
          {pledges && pledges.name ? (
            <AllPledges
              isOpen={this.state.AllPledgesModalIsOpen}
              pledges={pledges}
              closeAllPledgesModal={this.closeAllPledgesModal}
              name={pledges.name}
            />
          ) : null}

          {/* Modal for showing increase pledge form  */}
          {typeof myPledge !== 'undefined' && myPledge !== null ? (
            myPledge.length > 0 ? (
              <IncreasePledge
                isOpen={this.state.IncreasePledgesModalIsOpen}
                changeTreeCount={this.changeTreeCount}
                updatingTreeCount={this.state.updatingTreeCount}
                closeIncreasePledgesModal={this.closeIncreasePledgesModal}
                myPledge={myPledge}
                onUpdatePledgeSubmit={this.onUpdatePledgeSubmit}
              />
            ) : null
          ) : null}

          {/* Modal for showing Later Continue option after Pledge  */}
          <MakePledge
            isOpen={this.state.SubmitPledgeModalIsOpen}
            onRequestClose={this.closeSubmitPledgeModal}
            treeCount={this.state.value.treeCount}
            closeSubmitPledgeModal={this.closeSubmitPledgeModal}
          />

          {/* Modal for showing Later Continue option after Update */}
          <UpdatePledge
            isOpen={this.state.SubmitUpdateModalIsOpen}
            onRequestClose={this.closeSubmitUpdateModal}
            treeCount={this.state.updatingTreeCount}
            closeSubmitUpdateModal={this.closeSubmitUpdateModal}
          />
        </div>
      </div>
    );
  }
}

Pledge.propTypes = {
  pledges: PropTypes.object,
  eventSlug: PropTypes.string,
  postPledge: PropTypes.func,
  pledgeEvents: PropTypes.any,
  currentUserProfile: PropTypes.any
};
