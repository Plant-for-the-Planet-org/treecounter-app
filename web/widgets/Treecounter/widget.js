import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App';

import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import './treecounter.widget.scss';
// import native Shim to compile ES6 class as it is

import '../common/native-shim';
import PFTPWidgetTreeCounter from './PFTPNativeTreeCounterWidget';
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
  for (let i = allBlockQuote.length - 1; i > -1; i--) {
    let widgetType = allBlockQuote[i].attributes.getNamedItem(
      'data-widget-type'
    );
    const isPFTPBlockQuote = !!allBlockQuote[i].attributes.getNamedItem('pftp');
    if (!isPFTPBlockQuote || !widgetType) {
      return;
    }
    widgetType = widgetType.nodeValue;
    const isStandardTreecounter = widgetType === 'treecounter-standard';
    if (widgetType === 'treecounter' || isStandardTreecounter) {
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

      let projectId = allBlockQuote[i].attributes.getNamedItem(
        'data-projectId'
      );
      if (projectId && projectId.nodeValue) {
        projectId = projectId.nodeValue;
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
        const uidData = isStandardTreecounter ? { uid } : {};
        getRequest('treecounter_get', uidData)
          .then(result => {
            if (!result.data) {
              return;
            }
            let customElementRegistry = window.customElements;
            //Register New Custom element in DOM
            try {
              customElementRegistry.define(
                'pftp-widget-treecounter',
                PFTPWidgetTreeCounter
              );
            } catch (err) {
              console.log(err);
            }

            let treecounter = result.data;
            if (!isStandardTreecounter) {
              treecounter.id = 1;
            }

            let div = document.createElement('pftp-widget-treecounter');
            const shadowRoot = div.attachShadow({ mode: 'closed' });
            allBlockQuote[i].parentNode.insertBefore(div, allBlockQuote[i]);
            ReactDOM.render(
              <App
                key={'test_app'}
                treecounter={treecounter}
                showGraphics={!!showGraphics && !isStandardTreecounter}
                showDonateButton={!!showDonateButton}
                serverName={serverName}
                baseUrl={baseUrl}
                backgroundColor={backgroundColor}
                isStandardTreecounter={isStandardTreecounter}
                projectId={projectId}
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
