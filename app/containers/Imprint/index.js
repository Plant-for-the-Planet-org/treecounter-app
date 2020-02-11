import React from 'react';
import _ from 'lodash';
import { debug } from '../../debug';
import Imprint from '../../components/Imprint';
import { ImprintAction } from '../../actions/imprintAction';

class ImprintContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      imprints: []
    };
  }

  componentWillMount() {
    ImprintAction().then(
      success => {
        try {
          const imprint = _.sortBy(success.data, ['position', 'id']);
          this.setState({
            loading: false,
            imprints: imprint
          });
        } catch (err) {
          debug(err);
          this.setState({
            loading: false
          });
        }
      },
      error => debug(error)
    );
  }
  render() {
    return (
      <Imprint imprints={this.state.imprints} loading={this.state.loading} />
    );
  }
}

export default ImprintContainer;
