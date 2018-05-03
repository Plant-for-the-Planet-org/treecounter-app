import React from "react";

import SearchAutosuggest from "./SearchAutosuggest";
import * as constants from '../../SupportedLanguages/en'

const SearchBar = () => {
  return (
    <form>
      <div className="input-group">
        <SearchAutosuggest />
        <span className="input-group-addon search">
          <i className="material-icons header-icons">{constants.formStrings.search}</i>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
