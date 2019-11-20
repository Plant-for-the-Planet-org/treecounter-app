import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { postDirectRequest } from '../../utils/api';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';
import {
  profile,
  country,
  organization,
  company,
  education,
  competition
} from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n.js';
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const profileType = {
  individual: profile,
  country,
  tpo: organization,
  organization,
  company,
  education,
  competition
};

const getSuggestionValue = suggestion => `${suggestion.name}`;

class Errormessage extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  render() {
    return <p>sdbfhsdbf</p>;
  }
}

export default Errormessage;
