const Token = require("./token_interaction");
const adjSys = require("./adjacent_system_interaction");
const express = require('express');
const state = require('./state');
const app = express();
const port = 80;
require('dotenv').config();

state.client_id = process.env.INTEGRATION_ID;
state.secret_key = process.env.API_KEY;

app.get('/', async (req, res) => {
  state.auth_code = req.query.code;
  state.client_id = req.query.client_id;
  state.subdomain = req.query.referer;
  await Token.getToken();
  res.sendStatus(200);
  console.log("Got token");
})

app.get('/createTransaction', async (req, res) => {
  console.log(req.query.phone);
  var response = await adjSys.createTransaction(req.query.name, req.query.email, req.query.phone);

})

app.listen(port, () => {
  console.log(`Started on ${port}`)
})


