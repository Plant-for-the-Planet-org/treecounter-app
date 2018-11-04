import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';
import SearchAutosuggest from './SearchAutosuggest';

class SearchBar extends React.Component {
  suggestionClicked = (event, data) => {
    this.props.route('app_treecounter', null, {
      treecounter: data.suggestion.slug || data.suggestion.id
    });
    if (data.method === 'enter') {
      event.preventDefault();
    }
  };

  render() {
    return (
      <div>
        <div className="search-bar">
          <SearchAutosuggest onSuggestionClicked={this.suggestionClicked} />
          <i className="material-icons search-icon">{'search'}</i>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      route: (routeName, id, params) => dispatch =>
        updateRoute(routeName, dispatch, id, params)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SearchBar);

SearchBar.propTypes = {
  route: PropTypes.func
};
