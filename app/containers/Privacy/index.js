import React from 'react';
import Privacy from '../../components/Privacy';
import { PrivacyAction } from '../../actions/privacyAction';

class PrivacyContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      privacy: []
    };
  }

  componentWillMount() {
    PrivacyAction().then(
      success => {
        this.setState({
          loading: false,
          privacy: success.data
        });
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <Privacy privacies={this.state.privacy} loading={this.state.loading} />
    );
  }
}

export default PrivacyContainer;
