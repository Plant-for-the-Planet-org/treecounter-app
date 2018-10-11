import { getApiRoute } from '../../../app/actions/apiRouting';
import axios from 'axios';
import { context } from '../../../app/config';
import { tree_outline } from '../../../app/assets';
import './basic.widget.scss';
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
    if (allBlockQuote[i].attributes.getNamedItem('pftp')) {
      let uid = allBlockQuote[i].attributes.getNamedItem('data-treecounterId');
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
                .replace('${tree-count}', result.data.countPersonal)
                .replace('${user}', result.data.displayName)
                .replace('${img-src}', tree_outline)
                .replace('${user-id}', uid);
            console.log(result);
            allBlockQuote[i].parentNode.insertBefore(div, allBlockQuote[i]);
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
            console.log(error);
          });
      }
    }
  }
});
