import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import { tree_outline } from '../../../app/assets';
import './basic.widget.scss';
import i18n from './locales/i18n';
import { getLocalRoute } from '../../../app/actions/apiRouting';

const widget = require('./basic.widget.html');
const { scheme, host, base: baseUrl } = context;

const serverName = `${scheme}://${host}`;
const cssStyle = `<link href="widget.css" rel="stylesheet"/>
  <link href="${serverName}/widget.css" rel="stylesheet"/>`;

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
        'basic'
    ) {
      let uid = allBlockQuote[i].attributes.getNamedItem('data-treecounterId');
      let ProjectId = allBlockQuote[i].attributes.getNamedItem(
        'data-projectId'
      );
      if (ProjectId && ProjectId.nodeValue) {
        ProjectId = ProjectId.nodeValue;
      }
      if (uid) {
        uid = isNaN(parseInt(uid.nodeValue))
          ? uid.nodeValue
          : parseInt(uid.nodeValue);
        getRequest('treecounter_get', { uid })
          .then(result => {
            const { data } = result;
            const header = document.createElement('header');

            let div = document.createElement('div');
            const shadowRoot = div.attachShadow({ mode: 'closed' });
            shadowRoot.innerHTML =
              cssStyle +
              widget
                .replace(
                  '${tree-count}',
                  i18n.t('label.planted_trees', {
                    count: result.data.countPersonal
                  })
                )
                .replace('${user}', result.data.displayName)
                .replace('${plant_trees}', i18n.t('label.plant_trees'))
                .replace('${img-src}', tree_outline)
                .replace('${user-id}', uid);
            console.log(result);
            allBlockQuote[i].parentNode.insertBefore(div, allBlockQuote[i]);
            allBlockQuote[i].parentNode.removeChild(allBlockQuote[i]);
            window.pftp = {
              giftTree: event => {
                console.log(event);
                const uid = event.target.id;
                const url = `${serverName}${getLocalRoute(
                  'app_donateTrees'
                )}/${ProjectId}`;
                console.log(serverName);
                window.open(url, '_blank');
              }
            };
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
});
