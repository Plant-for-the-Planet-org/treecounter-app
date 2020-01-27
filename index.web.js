import React from 'react';
import ReactDOM from 'react-dom';

// Uncomment this to post warnings about unnecessary updates
// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React, { exclude: [/^InnerSlider/] });
// }

import App from './app/components/App';
import './ReactotronConfig';

import './web/stylesheet/index.scss';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(<App />, document.getElementById('root'));
