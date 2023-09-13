const request = require('request');

var response_result;

async function getToken(url, auth_code) {
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
    return new Promise((resolve, reject) => {
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

    // console.log(response_result);
    console.log(response_result);
    return response_result;
};


module.exports = { getToken };