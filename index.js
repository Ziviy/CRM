const Token = require("./token_interaction");

const express = require('express');
const cli = require('nodemon/lib/cli');
const request = require('request');
const app = express();
const port = 80;

var auth_code, client_id, expires_in;


require('dotenv').config();
console.log(process.env.API_KEY);

app.get('/', async (req, res) => {
  auth_code = req.query.code;
  client_id = req.query.client_id;
  var token_result = await Token.getToken(req.query.referer, auth_code);

})

app.listen(port, () => {
  console.log(`Started on ${port}`)
})


