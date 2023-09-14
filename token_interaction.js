const request = require('request');

var response_result, expires_in, subdomain;

async function getToken(url, auth_code) {
    subdomain = url;
    var getTokenReq = {
        uri: 'https://' + subdomain + '/oauth2/access_token',
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
            expires_in = response_result.expires_in;
        })

    })


};

async function refreshToken() {
    let currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    if (expires_in <= currentTime);
    getToken()
}


module.exports = { getToken, expires_in };