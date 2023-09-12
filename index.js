const express = require('express');
const cli = require('nodemon/lib/cli');
const request = require('request');
const app = express();
const port = 80;

var auth_code, client_id, expires_in;


require('dotenv').config();
console.log(process.env.API_KEY);

app.get('/', (req, res) => {
  auth_code = req.query.code;
  client_id = req.query.client_id;
  getToken(req.query.referer);
})

app.listen(port, () => {
  console.log(`Started on ${port}`)
})

function getToken(url) {
  console.log('https://' + url + '/oauth2/access_token');
    var getTokenReq = {
      uri: 'https://' + url + '/oauth2/access_token',
      json: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        client_id: process.env.INTEGRATION_ID,
        client_secret: process.env.API_KEY,
        grant_type: 'authorization_code',
        code: auth_code,
        redirect_uri: "https://shiner-touched-pup.ngrok-free.app/"
      }
    }

    request(getTokenReq, function (error, response, body) {
      if (error) {
        console.error(error);
        return;
      }
      console.log(body);
    });
  
}
