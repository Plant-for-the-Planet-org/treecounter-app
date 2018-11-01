import axios from 'axios';
import { getRequest } from './app/utils/api';
const fs = require('fs');

const list = [
  {
    api: 'https://www.trilliontreecampaign.org/api/v1.0/en/resetPassword',
    file: 'resetPassword.js'
  }
];

for (let i in list) {
  getRequest(list[i]['api']).then(response => {
    fs.writeFile(
      './app/server/formSchemas/' + list[i]['file'],
      'export default ' + response,
      function(err) {
        if (err) {
          return console.log(err);
        }

        console.log('The file was saved!');
      }
    );
  });
}
