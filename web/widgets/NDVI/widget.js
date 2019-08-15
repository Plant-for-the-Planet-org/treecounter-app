import React from 'react';
import ReactDOM from 'react-dom';
//components
import App from './app/components/App';
//style
import './ndvi.widget.scss';
//init widget imports
import '../common/native-shim';
import PFTPWidgetNDVI from './PFTPWidgetNDVIWidget';

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
    if (widgetType === 'ndvi') {
      let projectId = allBlockQuote[i].attributes.getNamedItem(
        'data-projectId'
      );
      if (projectId && projectId.nodeValue) {
        projectId = projectId.nodeValue;
      }
      let customElementRegistry = window.customElements;
      //Register New Custom element in DOM
      try {
        customElementRegistry.define('pftp-widget-ndvi', PFTPWidgetNDVI);
      } catch (err) {}

      let div = document.createElement('pftp-widget-ndvi');
      const shadowRoot = div.attachShadow({ mode: 'closed' });
      const newDivNode = allBlockQuote[i].parentNode.insertBefore(
        div,
        allBlockQuote[i]
      );
      ReactDOM.render(<App key={'test_app'} />, shadowRoot);
      allBlockQuote[i].parentNode.removeChild(allBlockQuote[i]);
    }
  }
});
