const request = require('request');
const Token = require("./token_interaction");
const state = require('./state');

var response;

async function createTransaction(name, email, phone) {
    response = await getContactsNumber(phone);
    console.log(response);
    // if (response.)
}

async function getContactsNumber(mobileNumber, ) {
    await Token.refreshToken();
    console.log("ITSME" + state.access_token)
    var getContactsNumber = {
        uri: "https://" + state.subdomain + '/api/v4/contacts?query=' + mobileNumber,
        json: true,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + state.access_token,
            'Content-Type': 'application/json'
        }
    }
    new Promise((resolve, reject) => {
        request(getContactsNumber, function (error, response, body) {
            if (error) {
                console.log("ERROR");
                console.error(error);
                reject(error);
                return;
            }
            console.log(body._embedded.contacts);
            resolve(body);
        })
    })

    


};


module.exports = { getContactsNumber, createTransaction };