import React from 'react';

import SearchAutosuggest from './SearchAutosuggest';
import * as constants from '../../SupportedLanguages/en';

const SearchBar = () => {
  return (
    <form>
      <div className="search-bar">
        <SearchAutosuggest />
        <span className="search-bar__button">
          <i className="material-icons header-icons">
            {constants.formStrings.search}
          </i>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
