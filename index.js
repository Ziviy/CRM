const Token = require("./token_interaction");
const adjSys = require("./adjacent_system_interaction");
const express = require('express');
const cli = require('nodemon/lib/cli');
const request = require('request');
const app = express();
const port = 80;

var auth_code, client_id, expires_in, subdomain;


require('dotenv').config();
console.log(process.env.API_KEY);

app.get('/', async (req, res) => {
  auth_code = req.query.code;
  client_id = req.query.client_id;
  subdomain = req.query.referer;
  var token_result = await Token.getToken(subdomain, auth_code);
  res.send(200);
})

app.get('/createTransaction', async (req, res) => {
  var response = adjSys.createTransaction(req.query.name, req.query.email, req.query.phone, subdomain);

})

app.listen(port, () => {
  console.log(`Started on ${port}`)
})


