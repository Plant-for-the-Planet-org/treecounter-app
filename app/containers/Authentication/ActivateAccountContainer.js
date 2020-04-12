import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { debug } from '../../debug';
import { sendEmail } from '../../actions/authActions';
import ActivateAccount from '../../components/Authentication/ActivateAccount';
import { fetchItem } from '../../stores/localStorage';

class ActivateAccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  async UNSAFE_componentWillMount() {
    let email = await fetchItem('email').catch(error => debug(error));
    this.setState({
      email: email
    });
  }

  render() {
    return (
      <ActivateAccount
        sendEmail={this.props.sendEmail.bind(this, this.props.navigation)}
        email={this.state.email}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      sendEmail
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ActivateAccountContainer);

ActivateAccountContainer.propTypes = {
  sendEmail: PropTypes.func,
  navigation: PropTypes.any
};
