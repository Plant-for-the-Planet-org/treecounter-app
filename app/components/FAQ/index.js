import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';

const LoadingIndicator = lazy(() =>
  import('../../components/Common/LoadingIndicator')
);
const TextHeading = lazy(() =>
  import('../../components/Common/Heading/TextHeading')
);
const DescriptionHeading = lazy(() =>
  import('../../components/Common/Heading/DescriptionHeading')
);

import i18n from '../../locales/i18n.js';

import CardLayout from '../Common/Card';

export default class FAQ extends Component {
  GetFAQList() {
    return this.props.faqs.map((faq, i) => (
      <AccordionItem key={'faq' + i}>
        <AccordionItemTitle>
          <div className="u-position-relative">
            {faq.question}
            <div className="accordion__arrow" role="presentation" />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody>
          <div
            dangerouslySetInnerHTML={{
              __html: faq.answer
            }}
          />
        </AccordionItemBody>
      </AccordionItem>
    ));
  }
  render() {
    return this.props.loading ? (
      <div className="app-container__content--center sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {i18n.t('label.faqs')}
          <DescriptionHeading>
            {i18n.t('label.description1')}
            <a
              href={'https://' + i18n.t('label.description2')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {i18n.t('label.description2')}
            </a>{' '}
            {i18n.t('label.description3')}
          </DescriptionHeading>
        </TextHeading>
        <CardLayout>
          <Accordion>{this.GetFAQList()}</Accordion>
        </CardLayout>
      </div>
    );
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
