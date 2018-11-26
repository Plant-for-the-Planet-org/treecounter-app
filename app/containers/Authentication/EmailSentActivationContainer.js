import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { sendEmail } from '../../actions/authActions';
import ActivateAccount from '../../components/Authentication/ActivateAccount';
import { fetchItem } from '../../stores/localStorage';
import EmailSentActivation from '../../components/Authentication/EmailSentActivation/index.native';

class EmailSentActivationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  async componentWillMount() {
    let email = await fetchItem('email');
    this.setState({
      email: email
    });
  }

  render() {
    return (
      <EmailSentActivation
        sendEmail={this.props.sendEmail.bind(this, this.props.navigation)}
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

export default connect(null, mapDispatchToProps)(EmailSentActivationContainer);

EmailSentActivationContainer.propTypes = {
  sendEmail: PropTypes.func,
  navigation: PropTypes.object
};
