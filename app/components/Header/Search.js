import React from 'react';

import SearchAutosuggest from './SearchAutosuggest';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const SearchBar = () => {
  return (
    <form>
      <div className="search-bar">
        <SearchAutosuggest />
        <span className="search-bar__button">
          <i className="material-icons header-icons">
            {i18n.t('label.headerlabels.search', { lng })}
          </i>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
