import React from 'react';

import FAQ from '../../components/FAQ';
import { FAQAction } from '../../actions/faqAction';

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
        this.setState({
          loading: false,
          faqs: success.data
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
