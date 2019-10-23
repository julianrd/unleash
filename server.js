'use strict';

const unleash = require('./lib/server-impl');
// eslint-disable-next-line no-unused-vars
const CognitoAuthenticator = require('./lib/auth/cognito');
const sharedSecret = process.env.CLIENT_API_SECRET;

unleash
    .start({
        enableLegacyRoutes: false,
        preRouterHook: app => {
            app.use('/api/client', (req, res, next) => {
                if (req.header('authorization') === sharedSecret) {
                    next();
                } else {
                    res.sendStatus(401);
                }
            });
        },
    })
    .then(service => {
        console.log(
            `Unleash started on http://localhost:${service.app.get('port')}`
        );
    });
