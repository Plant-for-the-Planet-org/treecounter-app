import React from "react";
import ReactDOM from "react-dom";

import App from './app/components/App';

// Import bootstrap CSS
import "./web/bootstap/bootstrap-3.3.7-dist/css/bootstrap.min.css";
// Import Sass
import "./web/stylesheet/index.scss";
// Import CSS for react notifications
import "react-notifications/lib/notifications.css";

// Import JS
import "./web/bootstap/bootstrap-3.3.7-dist/js/tpo_carousel.js";
import "./web/bootstap/bootstrap-3.3.7-dist/js/bootstrap.min.js";

ReactDOM.render(<App />, document.getElementById('root'));
