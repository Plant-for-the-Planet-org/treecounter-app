import React from "react";
import { Provider } from "react-redux";
import ReactOnRails from "react-on-rails";

import TreeCounter from "./app/index";
import configureStore from "./app/stores/TreecounterStore";
import { debug } from "./app/debug/index";
import { initialProps, context } from "./app/config/index.js";

let store;

const App = (railsProps, railsContext) => {

  debug("initiating store");

  store = ("serverSide" in railsContext) ?
    ReactOnRails.getStore("TreecounterStore") :
    configureStore(initialProps, context);

  return (
    <Provider store={store}>
      <TreeCounter />
    </Provider>
  );
};

export const getStore = () => store;

export default App;
