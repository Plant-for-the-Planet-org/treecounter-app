import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App';
// import App from './app/components/App';

import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import './donateTrees.widget.scss';

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
const cssStyle = `<link href="donatetreewidget.css" rel="stylesheet"/>
<link href="${serverName}/widget.css" rel="stylesheet"/>`;

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
      let showGraphics = allBlockQuote[i].attributes.getNamedItem(
        'data-show-graphics'
      );
      let showDonateButton = allBlockQuote[i].attributes.getNamedItem(
        'data-show-donate-button'
      );
      let backgroundColor = allBlockQuote[i].attributes.getNamedItem(
        'data-background-color'
      );

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
            document.registerElement('pftp-widget-treecounter');
            const treecounter = result.data;

            let div = document.createElement('pftp-widget-treecounter');
            // div.className = 'pftp-widget-tree-counter-container';
            const shadowRoot = div.attachShadow({ mode: 'closed' });
            const newDivNode = allBlockQuote[i].parentNode.insertBefore(
              div,
              allBlockQuote[i]
            );

            shadowRoot.innerHTML =
              cssStyle +
              `<button class="pftp-button-follow" type="button" id="${uid}" onclick="pftp.giftTree(event)">Donate trees</button>`;

            window.pftp = {
              giftTree: event => {
                console.log(event);
                // const uid = event.target.id;
                // const url = `${serverName}${baseUrl}/giftTrees?uid=${uid}`;
                // console.log(serverName);
                // window.open(url, '_blank');
                const body = document.body;
                let div = document.createElement('div');
                div.className = 'overlay-container ';
                body.appendChild(div);
                ReactDOM.render(
                  <App
                    key={'test_app'}
                    treecounter={treecounter}
                    showGraphics={!!showGraphics}
                    showDonateButton={!!showDonateButton}
                    serverName={serverName}
                    baseUrl={baseUrl}
                    backgroundColor={backgroundColor}
                  />,
                  div
                );
              }
            };
            allBlockQuote[i].parentNode.removeChild(allBlockQuote[i]);
          })
          .catch(error => {
            console.log(error, 'name');
          });
      }
    }
  }
});
