import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App';
// import App from './app/components/App';

import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import './donateTrees.widget.scss';
//dont forgot to include this file to remove following error from console
// Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.

import '../common/native-shim';
import PFTPNativeDonationWidget, {
  PFTPNativeDonationWidgetFlow
} from './PFTPNativeDonationWidget';

// import retargetEvents from 'react-shadow-dom-retarget-events';
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
//TODO harsh@onezeroeight.co
//Move this code as common code under common folder under  widget
document.addEventListener('DOMContentLoaded', function() {
  let allBlockQuote = document.getElementsByTagName('blockquote');
  for (let i = 0; i < allBlockQuote.length; i++) {
    console.log(allBlockQuote[i].attributes);
    if (
      allBlockQuote[i].attributes.getNamedItem('pftp') &&
      allBlockQuote[i].attributes.getNamedItem('data-widget-type').nodeValue ===
        'donateTrees'
    ) {
      let uid = allBlockQuote[i].attributes.getNamedItem('data-treecounterId');
      let inlineDonation = allBlockQuote[i].attributes.getNamedItem(
        'data-inline-donation'
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

      if (inlineDonation && inlineDonation.nodeValue === 'false') {
        inlineDonation = false;
      }
      if (showDonateButton && showDonateButton.nodeValue === 'false') {
        showDonateButton = false;
      }
      if (backgroundColor && backgroundColor.nodeValue) {
        backgroundColor = backgroundColor.nodeValue;
      }
      if (ProjectId && ProjectId.nodeValue) {
        ProjectId = ProjectId.nodeValue;
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
            // document.registerElement('pftp-widget-donation');
            let customElementRegistry = window.customElements;
            //Register New Custom element in DOM
            customElementRegistry.define(
              'pftp-widget-donation',
              PFTPNativeDonationWidget
            );
            customElementRegistry.define(
              'pftp-widget-donation-flow',
              PFTPNativeDonationWidgetFlow
            );
            const treecounter = result.data;

            let div = document.createElement('pftp-widget-donation');
            // div.className = 'pftp-widget-tree-counter-container';
            const shadowRoot = div.attachShadow({ mode: 'closed' });
            allBlockQuote[i].parentNode.insertBefore(div, allBlockQuote[i]);

            ReactDOM.render(
              <App
                key={'test_app'}
                treecounter={treecounter}
                inlineDonation={!!inlineDonation}
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
