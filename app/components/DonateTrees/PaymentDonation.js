import React, { Component } from 'react';
import LiForm from 'liform-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PaymentSchema } from '../../layouts/donatePayment';
import CustomForm from '../Common/CustomForm';
import LoadingIndicator from '../Common/LoadingIndicator';
import { Payment } from '../../actions/paymentAction';
import i18n from '../../locales/i18n.js';

class PaymentDonation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schema: {},
      paymentMethod: i18n.t('label.pftp_paypal'),
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
    if (this.state.paymentMethod === i18n.t('label.pftp_sepa')) {
      paymentInfo.paymentOptions = `iban=${
        this.state.paymentOptions.iban
      }&bic=${this.state.paymentOptions.bic}`;
    }
    Payment(paymentInfo, this.state.selectedProject.id);
  }

  componentDidMount() {
    const {
      match: { params },
      userPlantProjects
    } = this.props;

    // Setting the selected project from the url params
    for (let key in userPlantProjects) {
      if (userPlantProjects[key].id == params.projectId) {
        let selectedProject = userPlantProjects[key];
        // Setting payment mode available
        let selectedPayments = this.props.tpo[selectedProject.tpoId]
          .paymentGateways;
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

        let index = data.schema.required.indexOf(i18n.t('label.paymentMethod'));
        if (index !== -1) data.schema.required.splice(index, 1);

        this.setState({ schema: data.schema, loading: false });
      })
      .catch(error => console.log(error));
  }

  getPaymentGateways() {
    return this.state.availablePaymentModes.map(element => {
      switch (element.name) {
        case i18n.t('label.pftp_paypal'):
          return (
            <div
              key={i18n.t('label.pftp_paypal')}
              className="radio payment-method__option"
            >
              <label>
                <input
                  type="radio"
                  value={i18n.t('label.pftp_paypal')}
                  checked={
                    this.state.paymentMethod === i18n.t('label.pftp_paypal')
                  }
                  onChange={this.handleOptionChange}
                />
                <div>
                  <span>{i18n.t('label.paypal')}</span>
                  <span>{i18n.t('label.redirectionMessage')}</span>
                </div>
                <div className="flex__spacer" />
                <img src="http://pngimg.com/uploads/paypal/paypal_PNG4.png" />
              </label>
            </div>
          );
        case i18n.t('label.pftp_sepa'):
          return (
            <div
              key={i18n.t('label.pftp_sepa')}
              className="radio payment-method__option"
            >
              <label>
                <input
                  type="radio"
                  value={i18n.t('label.pftp_sepa')}
                  checked={
                    this.state.paymentMethod === i18n.t('label.pftp_sepa')
                  }
                  onChange={this.handleOptionChange}
                />
                <div>
                  <span>{i18n.t('label.directDebit')}</span>
                  <span>{i18n.t('label.accountInfo')}</span>
                </div>
                <div className="flex__spacer" />
                <img src="https://www.cardgate.com/wp-content/themes/cardgate/download.php?file=SEPA-direct-debit-logo.png" />
              </label>
              <div className="payment-method__option--input">
                <span>{i18n.t('label.IBAN')}</span>
                <input
                  type="text"
                  value={this.state.paymentOptions.iban}
                  onChange={this.handleIbanInputChange}
                />
              </div>
              <div className="payment-method__option--input">
                <span>{i18n.t('label.BIC')}</span>
                <input
                  type="text"
                  value={this.state.paymentOptions.bic}
                  onChange={this.handleBicInputChange}
                />
              </div>
            </div>
          );
        case i18n.t('label.pftp_cc'):
          return (
            <div
              key={i18n.t('label.pftp_cc')}
              className="radio payment-method__option"
            >
              <label>
                <input
                  type="radio"
                  value={i18n.t('label.pftp_cc')}
                  checked={this.state.paymentMethod === i18n.t('label.pftp_cc')}
                  onChange={this.handleOptionChange}
                />
                <div>
                  <span>{i18n.t('label.creditCard')}</span>
                  <span>{i18n.t('label.creditCardMessage')}</span>
                </div>
                <div className="flex__spacer" />
                <img src="http://www.pngmart.com/files/3/Credit-Card-Visa-And-Master-Card-PNG-HD.png" />
              </label>
            </div>
          );
      }
    });
  }
  render() {
    return (
      <div className="payment-page-container">
        <h3>{i18n.t('label.donateTrees')}</h3>
        <h6>{i18n.t('label.donateTreesMessage')}</h6>
        <div className="horizontal-round-bar">
          <div className="horizontal-round-bar__spacer" />
          <span>1</span>
          <div className="horizontal-round-bar__spacer" />
        </div>
        <div className="project-details">
          <h4 className="project-details__heading">
            {i18n.t('label.project_details')}
          </h4>
          <div className="project-details__content">
            <div className="project-details__content--left">
              <span className="project-details__content--left__name">
                {this.state.selectedProject.name}
              </span>
              <div className="project-details__table">
                <span>{i18n.t('label.planted')}:</span>
                <span>{this.state.selectedProject.countPlanted}</span>

                <span>{i18n.t('label.target')}:</span>
                <span>{this.state.selectedProject.countTarget}</span>

                <span>{i18n.t('label.Cost')}:</span>
                <span>{this.state.selectedProject.treeCost}</span>
                {this.state.selectedProject.isCertified
                  ? i18n.t('label.certified')
                  : i18n.t('label.nonCertified')}
              </div>
            </div>
            <div className="project-details__content--right">
              <img src="http://www.sagegardensandlandscapes.co.uk/wp-content/uploads/2013/12/Planting-plant.jpg" />
            </div>
          </div>
          <div className="project-details__footer">
            <a>{i18n.t('label.seeMore')}</a>
            <Link to="/donateTrees">
              {i18n.t('label.selectDifferentProject')}
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
          buttonText={i18n.t('label.donate')}
          buttonWidth="240"
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userPlantProjects: state.entities.plantProject,
    paymentgateway: state.entities.paymentGateway,
    tpo: state.entities.tpo
  };
};

export default connect(mapStateToProps)(PaymentDonation);

PaymentDonation.propTypes = {
  userPlantProjects: PropTypes.object.isRequired,
  paymentgateway: PropTypes.object.isRequired,
  tpo: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.number
    })
  }).isRequired
};
