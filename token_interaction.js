const request = require('request');
const state = require('./state');
var response_result;

async function getToken() {
    var getTokenReq = {
        uri: 'https://' + state.subdomain + '/oauth2/access_token',
        json: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            client_id: state.client_id,
            client_secret: state.secret_key,
            grant_type: 'authorization_code',
            code: state.auth_code,
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
            resolve(body);
            state.expires_in = body.expires_in;
            state.access_token = body.access_token;
            state.refresh_token = body.refresh_token;
        })

    })


};

async function refreshToken() {

    let currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    console.log(Date.now() + " " + state.expires_in);
    if (((state.expires_in - 60) <= currentTime) && (state.expires_in != null)) {
        console.log("Обновляю токен");
        var getTokenReq = {
            uri: 'https://' + state.subdomain + '/oauth2/access_token',
            json: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                client_id: state.client_id,
                client_secret: state.secret_key,
                grant_type: 'refresh_token',
                refresh_token: state.refresh_token,
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
                resolve(body);
                state.expires_in = body.expires_in;
                state.access_token = body.access_token;
                state.refresh_token = body.refresh_token;
            })
    
        })
    }
        
}


module.exports = { getToken, refreshToken};