import React from 'react';

import SearchAutosuggest from './SearchAutosuggest';
import i18n from '../../locales/i18n.js';

const SearchBar = () => {
  return (
    <form>
      <div className="search-bar">
        <SearchAutosuggest />
        <span className="search-bar__button">
          <i className="material-icons header-icons">
            {i18n.t('label.search')}
          </i>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
