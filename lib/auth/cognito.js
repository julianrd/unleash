'use strict';

const fetch = require('node-fetch');
const { JWT, JWK } = require('jose');

class CognitoAuthenticator {
    constructor() {
        getPem(
            process.env.COGNITO_REGION,
            process.env.COGNITO_USER_POOL_ID
        ).then(jwk => {
            this.jwk = jwk;
        });
    }

    decodeToken(token) {
        return JWT.decode(token);
    }

    verifyToken(token) {
        if (!this.jwk) {
            console.log('jwk is undefined');
            throw new Error('jwk is undefined');
        }
        return JWT.verify(token, JWK.asKey(this.jwk), {
            algorithms: ['RS256'],
        });
    }
}

function getPem(region, userPoolId) {
    const jwkUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

    return fetch(jwkUrl, { method: 'GET' })
        .then(res => res.json())
        .then(res => res.keys.shift());
}

module.exports = new CognitoAuthenticator();
