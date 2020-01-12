import React from 'react';

import EmailSent from '../../components/Authentication/EmailSent';

export default class EmailSentContainer extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <EmailSent navigation={this.props.navigation} />;
  }
}
