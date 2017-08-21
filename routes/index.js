var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const secret = require('../app/config/index').secret;
var customer = require('../app/customer/index').customer;

var requireSession = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.json({
                    result: null,
                    errors: ['Invalid token']
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            result: null,
            errors: ['Authorization required']  
        });
    }
};

router.get('/', function(req, res, next) {
  res.send('This is hompage');
});

//Router for Customer
router.post('/signin', customer.signin);
router.post('/signup', customer.signUp);
router.post('/change-password', [requireSession, customer.updatePassword]);
router.post('/update-peronal-info', [requireSession, customer.updatePersonalInfo]);
// router.post('/check-current-password',[requireSession, customer.checkCurrentPassword]);
router.get('/admin/listOfCustomers', [requireSession, customer.listOfCustomers]);
router.get('/get-information', [requireSession, customer.getInformation]);
module.exports = router;
