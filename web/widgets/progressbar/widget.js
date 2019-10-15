import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App';

import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import './progressbarwidget.scss';
// import native Shim to compile ES6 class as it is
import './native-shim';
import PFTPWidgetTreeCounter from './PFTPNativeProgressbarWidget';
const { scheme, host, base: baseUrl } = context;
const serverName = `${scheme}://${host}`;

export async function getRequest(route, params) {
  let url = await getApiRoute(route, params);
  return await axios
    .get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  let allBlockQuote = document.getElementsByTagName('blockquote');
  for (let i = 0; i < allBlockQuote.length; i++) {
    console.log(allBlockQuote[i].attributes);
    if (
      allBlockQuote[i].attributes.getNamedItem('pftp') &&
      allBlockQuote[i].attributes.getNamedItem('data-widget-type').nodeValue ===
        'treecounter-progress'
    ) {
      let uid = allBlockQuote[i].attributes.getNamedItem('data-treecounterId');
      let showGraphics = allBlockQuote[i].attributes.getNamedItem(
        'data-show-graphics'
      );
      let showDonateButton = allBlockQuote[i].attributes.getNamedItem(
        'data-show-donate-button'
      );
      let backgroundColor = allBlockQuote[i].attributes.getNamedItem(
        'data-background-color'
      );
      let ProjectId = allBlockQuote[i].attributes.getNamedItem(
        'data-projectId'
      );
      if (ProjectId && ProjectId.nodeValue) {
        ProjectId = ProjectId.nodeValue;
      }
      if (showGraphics && showGraphics.nodeValue === 'false') {
        showGraphics = false;
      }
      if (showDonateButton && showDonateButton.nodeValue === 'false') {
        showDonateButton = false;
      }
      if (backgroundColor && backgroundColor.nodeValue) {
        backgroundColor = backgroundColor.nodeValue;
      }
      if (uid) {
        uid = isNaN(parseInt(uid.nodeValue))
          ? uid.nodeValue
          : parseInt(uid.nodeValue);
        getRequest('treecounter_get', { uid })
          .then(result => {
            if (!result.data) {
              return;
            }
            let customElementRegistry = window.customElements;
            //Register New Custom element in DOM
            customElementRegistry.define(
              'pftp-widget-progressbar',
              PFTPWidgetTreeCounter
            );
            const treecounter = result.data;

            let div = document.createElement('pftp-widget-progressbar');
            const shadowRoot = div.attachShadow({ mode: 'closed' });
            allBlockQuote[i].parentNode.insertBefore(div, allBlockQuote[i]);
            ReactDOM.render(
              <App
                key={'test_app'}
                treecounter={treecounter}
                showGraphics={!!showGraphics}
                showDonateButton={!!showDonateButton}
                serverName={serverName}
                baseUrl={baseUrl}
                backgroundColor={backgroundColor}
                ProjectId={ProjectId}
              />,
              shadowRoot
            );
            allBlockQuote[i].parentNode.removeChild(allBlockQuote[i]);
          })
          .catch(error => {
            console.log(error, 'name');
          });
      }
    }
  }
});
