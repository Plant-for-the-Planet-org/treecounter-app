import React from 'react';

import FAQ from '../../components/FAQ';
import { FAQAction } from '../../actions/faqAction';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import TextHeading from '../../components/Common/Heading/TextHeading';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import i18n from '../../locales/i18n.js';
let lng = 'en';

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
    return this.state.loading ? (
      <div className="app-container__content--center sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {i18n.t('label.faqlabels.faqs', { lng })}
          <DescriptionHeading>
            {i18n.t('label.faqlabels.description1', { lng })}
            <a>{i18n.t('label.faqlabels.description2', { lng })}</a>{' '}
            {i18n.t('label.faqlabels.description3', { lng })}
          </DescriptionHeading>
        </TextHeading>
        <FAQ faqs={this.state.faqs} />
      </div>
    );
  }
}

export default FAQContainer;
