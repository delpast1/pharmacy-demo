var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const secret = require('../app/config/index').secret;
var customer = require('../app/customer/index').customer;
var drug = require('../app/drug/index').drug;
var order = require('../app/order/index').order;
var prescription = require('../app/prescription/index').prescription;

var requireSession = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.json({
                    errors: ['Invalid token']
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
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
                        errors: ['Role Admin required']  
                    });
                }
                
            }
        });
    } else {
        res.json({
            errors: ['Authorization required']  
        });
    }
};

var requireCustomer = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.json({
                    errors: ['Invalid token']
                });
            } else {
                if (decoded.role === 'customer'){
                    req.decoded = decoded;
                    next();
                } else {
                    res.json({
                        errors: ['Only for customer.']  
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
    // Order
router.post('/new-order', [requireCustomer, order.newOrder]);
router.get('/get-order-history', [requireCustomer, order.getOrderHistory]);
router.post('/get-detail-order', [requireCustomer, order.getDetailOfOrderByCustomer]);

//----------------------------------------------------------------

//Router for Admin
    // customers table
router.get('/admin/listOfCustomers', [requireAdmin, customer.listOfCustomers]);
    // drug table
router.get('/list-of-drug', [drug.getListOfDrug]);
router.post('/admin/add-new-drug', [requireAdmin, drug.addDrug]);
router.post('/admin/update-drug', [requireAdmin, drug.updateDrug]);
router.post('/admin/delete-drug', [requireAdmin, drug.deleteDrug]);
    //Order
router.post('/admin/get-order', [requireAdmin, order.getDetailOfOrder]);
router.get('/admin/get-all-orders', [requireAdmin, order.getAllOrders]);

//----------------------------------------------------------------
//Router
router.post('/new-prescription', [requireCustomer, prescription.newPrescription]);
router.post('/admin/accept-prescription', [requireAdmin, prescription.acceptPrescription]);
router.get('/get-list-prescriptions', [requireCustomer, prescription.getPrescriptions]);
router.get('/get-all-prescriptions', [requireAdmin, prescription.getAllPrescriptions]);
module.exports = router;
