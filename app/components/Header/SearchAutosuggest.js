import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { treecounterLookupAction } from '../../actions/treecounterLookupAction';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getSuggestions = value => {
  let bodyFormData = new FormData();
  let jdata = {};
  bodyFormData.set('q', value.trim());

  let xhttp = new XMLHttpRequest();
  xhttp.open(
    'POST',
    'https://staging.trilliontreecampaign.org/app_dev.php/search2',
    false
  ); // had to make a sync request until we find a proper async solution
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      jdata = this.responseText;
    }
  };

  xhttp.send('q=' + value.trim());

  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  jdata = JSON.parse(jdata);

  return jdata.filter(person => regex.test(getSuggestionValue(person)));
};

const renderSuggestion = suggestion => {
  return (
    <Link to={`/search/user/${suggestion.id}`} style={suggestionListItemStyle}>
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
        this.setState({
          suggestions: getSuggestions(value)
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
