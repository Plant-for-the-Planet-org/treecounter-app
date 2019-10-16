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

const getSuggestions = value => {
  return new Promise(resolve => {
    postDirectRequest('/suggest', 'q=' + value.trim()).then(result => {
      let jdata = result.data;
      const escapedValue = escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        resolve([]);
      }
      const regex = new RegExp('\\b' + escapedValue, 'i');

      resolve(
        typeof jdata === 'object'
          ? jdata.filter(person => regex.test(getSuggestionValue(person)))
          : []
      );
    });
  });
};

const renderSuggestion = suggestion => {
  return (
    <div>
      <div className="search-autusuggest__listitem ">
        <img
          src={
            suggestion.image
              ? getImageUrl('profile', 'avatar', suggestion.image)
              : profileType[suggestion.type]
          }
        />
        <span>{suggestion.name}</span>
      </div>
    </div>
  );
};

const getSuggestionValue = suggestion => `${suggestion.name}`;

class SearchAutosuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionClicked = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.props.onSuggestionClicked(event, {
      suggestion,
      suggestionValue,
      suggestionIndex,
      sectionIndex,
      method
    });
    if (this.props.clearSuggestions) {
      this.setState({
        value: ''
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    setTimeout(() => {
      if (value === this.state.value) {
        getSuggestions(value)
          .then(_suggestions => {
            this.setState({
              suggestions: _suggestions
            });
          })
          .catch(error => console.log(error));
      }
    }, 500);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    let { value, suggestions } = this.state;
    suggestions = suggestions.filter(
      suggestion => suggestion.category === 'profile'
    );
    const inputProps = {
      placeholder: i18n.t('label.placeholder_value'),
      value,
      onChange: this.onChange,
      className: 'form-control search_text',
      onKeyDown: event => {
        // console.log(event);
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionClicked}
        id="custom-render-example"
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ treecounterLookupAction }, dispatch);
};

SearchAutosuggest.propTypes = {
  onSuggestionClicked: PropTypes.func,
  clearSuggestions: PropTypes.bool,
  hideCompetitions: PropTypes.bool
};

SearchAutosuggest.defaultProps = {
  clearSuggestions: true
};

export default connect(null, mapDispatchToProps)(SearchAutosuggest);
