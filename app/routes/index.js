'use strict';

var jwt = require('jsonwebtoken');

const secret = require('../config/index').secret;

// var requireSession = (req, res, next) => {
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

//     if (token) {
//         jwt.verify(token, secret, (err, decoded) => {
//             if (err) {
//                 res.json({
//                     result: null,
//                     error: 'Invalid token'
//                 });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         res.json({
//             result: null,
//             error: 'Authorization required'
//         });
//     }
// };

exports = module.exports = (app, customer) => {
    app.get('/', (req,res) => {
        res.send('This is hompage');
    });
    require('./customer')(requireSession, app, customer);
}