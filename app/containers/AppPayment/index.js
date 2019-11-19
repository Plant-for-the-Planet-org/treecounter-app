import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppPayment = lazy(() => import('../../components/Payment/AppPayments'));

import { getPaymentInfo } from '../../actions/paymentAction';
import { getPaymentStatus } from '../../reducers/paymentStatus';

class AppPaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentInfo: null
    };
  }

  componentWillMount() {
    getPaymentInfo(this.props.match.params.donationContribution)
      .then(({ data }) => {
        this.setState({
          paymentInfo: data
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <AppPayment
        paymentStatus={this.props.paymentStatus}
        paymentInfo={this.state.paymentInfo}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    paymentStatus: getPaymentStatus(state)
  };
};

export default connect(mapStateToProps, null)(AppPaymentContainer);

AppPaymentContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      donationContribution: PropTypes.string
    })
  }).isRequired,
  paymentStatus: PropTypes.object
};
