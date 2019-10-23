'use strict';

const CognitoAuthenticator = require('../auth/cognito');

const validateJwtToken = () => (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(401)
            .json(new Error('Missing authorization header'))
            .end();
    }
    const jwtToken = req.headers.authorization.replace('Bearer ', '');
    CognitoAuthenticator.verifyToken(jwtToken);
    return next();
};

module.exports = {
    validateJwtToken,
};
