import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';
import renderHTML from 'react-render-html';

export default class FAQ extends Component {
  GetFAQList() {
    return this.props.faqs.map(faq => (
      <AccordionItem>
        <AccordionItemTitle>
          <div className="u-position-relative">
            {faq.question}
            <div className="accordion__arrow" role="presentation" />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody>{renderHTML(faq.answer)}</AccordionItemBody>
      </AccordionItem>
    ));
  }
  render() {
    return <Accordion>{this.GetFAQList()}</Accordion>;
  }
}

FAQ.propTypes = {
  faqs: PropTypes.array.isRequired
};
