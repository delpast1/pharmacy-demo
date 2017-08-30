var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const secret = require('../app/config/index').secret;
var customer = require('../app/customer/index').customer;
var drug = require('../app/drug/index').drug;
var order = require('../app/order/index').order;

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

var requireAdmin = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.json({
                    result: null,
                    errors: ['Invalid token']
                });
            } else {
                if (decoded.role === 'admin'){
                    next();
                } else {
                    res.json({
                        result: null,
                        errors: ['Role Admin required']  
                    });
                }
                
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

//Router for every user
    //customer table
router.post('/signin', customer.signin);
router.post('/signup', customer.signUp);
router.post('/change-password', [requireSession, customer.updatePassword]);
router.post('/update-peronal-info', [requireSession, customer.updatePersonalInfo]);
router.get('/get-information', [requireSession, customer.getInformation]);
    //drug table
router.post('/get-drug', [drug.getDrug]);

//----------------------------------------------------------------

//Router for Admin
    // customers table
router.get('/admin/listOfCustomers', [requireAdmin, customer.listOfCustomers]);
    // drug table
router.get('/admin/list-of-drug', [requireAdmin, drug.getListOfDrug]);
router.post('/admin/add-new-drug', [requireAdmin, drug.addDrug]);
router.post('/admin/update-drug', [requireAdmin, drug.updateDrug]);
router.post('/admin/delete-drug', [requireAdmin, drug.deleteDrug]);
    //Order
router.post('/new-order', [requireSession, order.newOrder]);
router.post('/admin/get-order', [requireAdmin, order.getDetailOfOrder]);

//----------------------------------------------------------------
//Router
module.exports = router;
