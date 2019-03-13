import React from 'react';
import Imprint from '../../components/Imprint';
import { ImprintAction } from '../../actions/imprintAction';
import sortBy from 'lodash/sortBy';

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
          const imprint = sortBy(success.data, ['position', 'id']);
          this.setState({
            loading: false,
            imprints: imprint
          });
        } catch (err) {
          console.log(err);
          this.setState({
            loading: false
          });
        }
      },
      error => console.log(error)
    );
  }
  render() {
    return (
      <Imprint imprints={this.state.imprints} loading={this.state.loading} />
    );
  }
}

export default ImprintContainer;
