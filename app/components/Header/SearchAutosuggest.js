import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { postRequest } from '../../utils/api';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getSuggestions = value => {
  return new Promise(resolve => {
    postRequest('search2', 'q=' + value.trim()).then(result => {
      let jdata = result.data;
      const escapedValue = escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        resolve([]);
      }
      const regex = new RegExp('\\b' + escapedValue, 'i');

      resolve(jdata.filter(person => regex.test(getSuggestionValue(person))));
    });
  });
};

const renderSuggestion = suggestion => {
  return (
    <Link
      to={`/treecounterLookup/${suggestion.id}`}
      style={suggestionListItemStyle}
    >
      <span>{suggestion.name}</span>
    </Link>
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

  onSuggestionsFetchRequested = ({ value }) => {
    setTimeout(() => {
      if (value === this.state.value) {
        getSuggestions(value).then(_suggestions => {
          this.setState({
            suggestions: _suggestions
          });
        });
      }
    }, 500);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a name',
      value,
      onChange: this.onChange,
      className: 'form-control search_text'
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        id="custom-render-example"
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ treecounterLookupAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchAutosuggest);

const suggestionListItemStyle = {
  color: '#68605F',
  textDecoration: 'none',
  fontFamily: 'Helvetica, sans-serif',
  fontWeight: '300',
  fontSize: '16px',
  display: 'flex',
  padding: '10px'
};
