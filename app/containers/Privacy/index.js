import React from 'react';
import Privacy from '../../components/Privacy';
import { PrivacyAction } from '../../actions/privacyAction';
import sortBy from 'lodash/sortBy';
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
        try {
          const privacy = sortBy(success.data, ['position', 'id']);
          this.setState({
            loading: false,
            privacy: privacy
          });
        } catch (err) {
          console.log(err);
        }
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
