import React, { Component } from 'react';
import LiForm from 'liform-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PaymentSchema } from '../../layouts/donatePayment';
import CustomForm from '../Common/CustomForm';
import LoadingIndicator from '../Common/LoadingIndicator';
import { userTreecounterSelector } from '../../selectors/index';
import { Payment } from '../../actions/paymentAction';
import { tpo } from '../../constants/strings';
import {
  currentUserProfileSelector,
  sortedUserPlantProjectsSelector,
  paymentGatewaysSelector
} from '../../selectors';
import { sortedUserContributionsSelector } from '../../selectors/index';
import * as constants from '../../SupportedLanguages/en';

class PaymentDonation extends Component {
  constructor(props) {
    console.log('Payment Donation ----- Constructor');

    super(props);
    this.state = {
      loading: true,
      schema: {},
      paymentMethod: 'pftp_paypal',
      paymentOptions: {
        iban: '',
        bic: ''
      },
      selectedProject: {},
      availablePaymentModes: []
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleIbanInputChange = this.handleIbanInputChange.bind(this);
    this.handleBicInputChange = this.handleBicInputChange.bind(this);
    this.handlePaymentDonate = this.handlePaymentDonate.bind(this);
  }

  handleOptionChange(changeEvent) {
    this.setState({ paymentMethod: changeEvent.target.value });
  }

  handleIbanInputChange(changeEvent) {
    this.setState({
      paymentOptions: {
        ...this.state.paymentOptions,
        iban: changeEvent.target.value
      }
    });
  }

  handleBicInputChange(changeEvent) {
    this.setState({
      paymentOptions: {
        ...this.state.paymentOptions,
        bic: changeEvent.target.value
      }
    });
  }

  handlePaymentDonate(paymentInfo) {
    paymentInfo.paymentMethod = this.state.paymentMethod;
    if (this.state.paymentMethod === 'pftp_sepa') {
      paymentInfo.paymentOptions = `iban=${
        this.state.paymentOptions.iban
      }&bic=${this.state.paymentOptions.bic}`;
    }
    console.log(paymentInfo);
    Payment(paymentInfo, this.state.selectedProject.id);
  }

  componentDidMount() {
    console.log('Payment Donation ----- Component will mount');

    const {
      match: { params },
      userPlantProjects
    } = this.props;

    // Setting the selected project from the url params
    for (let key in userPlantProjects) {
      if (userPlantProjects[key].id == params.projectId) {
        let selectedProject = userPlantProjects[key];
        // Setting payment mode available
        let selectedPayments = this.props.tpo[selectedProject.tpo_id]
          .payment_gateways;
        selectedPayments = selectedPayments.map(
          id => this.props.paymentgateway[id]
        );
        this.setState({
          selectedProject: selectedProject,
          availablePaymentModes: selectedPayments
        });
        break;
      }
    }
    // Get the schema for payment donation
    PaymentSchema()
      .then(({ data }) => {
        delete data.schema.properties.paymentMethod;
        delete data.schema.properties.paymentOptions;

        var index = data.schema.required.indexOf('paymentMethod');
        if (index !== -1) data.schema.required.splice(index, 1);

        this.setState({ schema: data.schema, loading: false });
      })
      .catch(error => console.log(error));
  }

  getPaymentGateways() {
    return this.state.availablePaymentModes.map(element => {
      switch (element.name) {
        case 'pftp_paypal':
          return (
            <div key="pftp_paypal" className="radio payment-method__option">
              <label>
                <input
                  type="radio"
                  value="pftp_paypal"
                  checked={this.state.paymentMethod === 'pftp_paypal'}
                  onChange={this.handleOptionChange}
                />
                <div>
                  <span>{constants.formStrings.paypal}</span>
                  <span>{constants.formStrings.redirectionMessage}</span>
                </div>
                <div className="flex__spacer" />
                <img src="http://pngimg.com/uploads/paypal/paypal_PNG4.png" />
              </label>
            </div>
          );
          break;
        case 'pftp_sepa':
          return (
            <div key="pftp_sepa" className="radio payment-method__option">
              <label>
                <input
                  type="radio"
                  value="pftp_sepa"
                  checked={this.state.paymentMethod === 'pftp_sepa'}
                  onChange={this.handleOptionChange}
                />
                <div>
                  <span>{constants.formStrings.directDebit}</span>
                  <span>{constants.formStrings.accountInfo}</span>
                </div>
                <div className="flex__spacer" />
                <img src="https://www.cardgate.com/wp-content/themes/cardgate/download.php?file=SEPA-direct-debit-logo.png" />
              </label>
              <div className="payment-method__option--input">
                <span>{constants.formStrings.IBAN}</span>
                <input
                  type="text"
                  value={this.state.paymentOptions.iban}
                  onChange={this.handleIbanInputChange}
                />
              </div>
              <div className="payment-method__option--input">
                <span>{constants.formStrings.BIC}</span>
                <input
                  type="text"
                  value={this.state.paymentOptions.bic}
                  onChange={this.handleBicInputChange}
                />
              </div>
            </div>
          );
          break;
        case 'pftp_cc':
          return (
            <div key="pftp_cc" className="radio payment-method__option">
              <label>
                <input
                  type="radio"
                  value="pftp_cc"
                  checked={this.state.paymentMethod === 'pftp_cc'}
                  onChange={this.handleOptionChange}
                />
                <div>
                  <span>{constants.formStrings.creditCard}</span>
                  <span>{constants.formStrings.creditCardMessage}</span>
                </div>
                <div className="flex__spacer" />
                <img src="http://www.pngmart.com/files/3/Credit-Card-Visa-And-Master-Card-PNG-HD.png" />
              </label>
            </div>
          );
          break;
      }
    });
  }
  render() {
    console.log('Payment Donation ----- Render', this.state.schema);
    return (
      <div className="payment-page-container">
        <h3>{constants.formStrings.donateTrees}</h3>
        <h6>{constants.formStrings.donateTreesMessage}</h6>
        <div className="horizontal-round-bar">
          <div className="horizontal-round-bar__spacer" />
          <span>1</span>
          <div className="horizontal-round-bar__spacer" />
        </div>
        <div className="project-details">
          <h4 className="project-details__heading">Project Details</h4>
          <div className="project-details__content">
            <div className="project-details__content--left">
              <span className="project-details__content--left__name">
                {this.state.selectedProject.name}
              </span>
              <div className="project-details__table">
                <span>{constants.formStrings.planted}:</span>
                <span>{this.state.selectedProject.count_planted}</span>

                <span>{constants.formStrings.target}:</span>
                <span>{this.state.selectedProject.count_target}</span>

                <span>{constants.formStrings.costPerTree}:</span>
                <span>{this.state.selectedProject.tree_cost}</span>
                {this.state.selectedProject.is_certified
                  ? 'Certified'
                  : 'Not Certified'}
              </div>
            </div>
            <div className="project-details__content--right">
              <img src="http://www.sagegardensandlandscapes.co.uk/wp-content/uploads/2013/12/Planting-plant.jpg" />
            </div>
          </div>
          <div className="project-details__footer">
            <a>{constants.formStrings.seeMore}</a>
            <Link to="/donateTrees">
              {constants.formStrings.selectDifferentProject}
            </Link>
          </div>
        </div>
        <div className="horizontal-round-bar">
          <div className="horizontal-round-bar__spacer" />
          <span>2</span>
          <div className="horizontal-round-bar__spacer" />
        </div>
        <div className="payment-method">
          <form>{this.getPaymentGateways()}</form>
        </div>
        <div className="horizontal-round-bar">
          <div className="horizontal-round-bar__spacer" />
          <span>3</span>
          <div className="horizontal-round-bar__spacer" />
        </div>
        <div className="text-center">
          {this.state.loading ? <LoadingIndicator /> : null}
        </div>
        <LiForm
          schema={this.state.schema}
          onSubmit={this.handlePaymentDonate}
          baseForm={CustomForm}
          headline=""
          buttonText="Donate"
          buttonWidth="240"
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  console.log('Payment Donation ------ Store updated', state);
  return {
    userPlantProjects: state.entities.plantProject,
    paymentgateway: state.entities.paymentGateway,
    tpo: state.entities.tpo
  };
};

export default connect(mapStateToProps)(PaymentDonation);
