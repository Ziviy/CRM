const request = require('request');
const Token = require("./token_interaction");

var response;

async function createTransaction(name, email, phone, subdomain) {
    response = await getContactsNumber(subdomain, phone);
    console.log(response);
    // if (response.)
}

async function getContactsNumber(subdomain, mobileNumber, ) {
    var getContactsNumber = {
        uri: "https://" + subdomain + '/api/v4/contacts?query=' + mobileNumber,
        json: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + 
        },
        body: {
            client_id: process.env.INTEGRATION_ID,
            client_secret: process.env.API_KEY,
            grant_type: 'authorization_code',
            code: auth_code,
            redirect_uri: 'https://shiner-touched-pup.ngrok-free.app/'
        }
    }
    new Promise((resolve, reject) => {
        request(getTokenReq, function (error, response, body) {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }
            response_result = body;
            resolve(response_result);
        })
    })
    


};


module.exports = { adjSys };