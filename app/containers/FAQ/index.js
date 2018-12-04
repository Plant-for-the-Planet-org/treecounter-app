import React from 'react';

import FAQ from '../../components/FAQ';
import { FAQAction } from '../../actions/faqAction';
import _ from 'lodash';

class FAQContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      faqs: []
    };
  }

  componentWillMount() {
    FAQAction().then(
      success => {
        const faqs = _.sortBy(success.data, ['position', 'id']);
        this.setState({
          loading: false,
          faqs
        });
      },
      error => console.log(error)
    );
  }

  render() {
    return <FAQ faqs={this.state.faqs} loading={this.state.loading} />;
  }
}

export default FAQContainer;
