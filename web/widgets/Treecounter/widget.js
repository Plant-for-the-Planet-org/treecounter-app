import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App';

import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import './treecounter.widget.scss';

const { scheme, host, base: baseUrl } = context;

const serverName = `${scheme}://${host}`;
const cssStyle = `<link href="treecounterwidget.css" rel="stylesheet"/>
  <link href="${serverName}/treecounterwidget.css" rel="stylesheet"/>`;

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
        'treecounter'
    ) {
      let uid = allBlockQuote[i].attributes.getNamedItem('data-treecounterId');
      let showGraphics = allBlockQuote[i].attributes.getNamedItem(
        'data-show-graphics'
      );
      if (showGraphics && showGraphics === 'false') {
        showGraphics = false;
      }
      showGraphics = true;
      if (uid) {
        uid = isNaN(parseInt(uid.nodeValue))
          ? uid.nodeValue
          : parseInt(uid.nodeValue);
        getRequest('treecounter_get', { uid })
          .then(result => {
            const treecounter = result.data;
            const header = document.createElement('header');

            let div = document.createElement('div');
            div.className = 'pftp-widget-tree-counter-container';
            const shadowRoot = div.attachShadow({ mode: 'closed' });
            shadowRoot.innerHTML = cssStyle;
            const newDivNode = allBlockQuote[i].parentNode.insertBefore(
              div,
              allBlockQuote[i]
            );
            let svgData = {
              id: treecounter.id,
              target: treecounter.countTarget,
              planted: treecounter.countPlanted,
              community: parseInt(treecounter.countCommunity),
              personal: treecounter.countPersonal,
              targetComment: 'test',
              targetYear: treecounter.targetYear,
              type: treecounter.userProfile.type
            };
            ReactDOM.render(
              <App {...svgData} showGraphics />,
              shadowRoot,
              () => (shadowRoot.innerHTML = cssStyle + shadowRoot.innerHTML)
            );

            allBlockQuote[i].parentNode.removeChild(allBlockQuote[i]);
            window.pftp = {
              giftTree: event => {
                console.log(event);
                const uid = event.target.id;
                const url = `${serverName}${baseUrl}/giftTrees?uid=${uid}`;
                console.log(serverName);
                window.open(url, '_blank');
              }
            };
          })
          .catch(error => {
            console.log(error, 'name');
          });
      }
    }
  }
});
