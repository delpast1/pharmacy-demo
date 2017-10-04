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
router.post('/changePassword', [requireSession, customer.updatePassword]);
router.post('/updatePeronalInfo', [requireSession, customer.updatePersonalInfo]);
router.get('/getInformation', [requireSession, customer.getInformation]);
    //drug table
router.post('/getDrug', [drug.getDrug]);
    // Order
router.post('/newOrder', [requireCustomer, order.newOrder]);
router.get('/getOrderHistory', [requireCustomer, order.getOrderHistory]);
router.post('/getDetailOrder', [requireCustomer, order.getDetailOfOrderByCustomer]);
    // Prescription
router.post('/newPrescription', [requireCustomer, prescription.newPrescription]);
router.get('/getListPrescriptions', [requireCustomer, prescription.getPrescriptions]);
router.post('/getPrescriptionDetail', [requireCustomer, prescription.getPrescriptionDetail]);
//----------------------------------------------------------------

//Router for Admin
    // customers table
router.get('/admin/listOfCustomers', [requireAdmin, customer.listOfCustomers]);
    // drug table
router.post('/searching', drug.searching);
router.get('/listOfDrug', [drug.getListOfDrug]);
router.post('/admin/addNewDrug', [requireAdmin, drug.addDrug]);
router.post('/admin/updateDrug', [requireAdmin, drug.updateDrug]);
router.post('/admin/deleteDrug', [requireAdmin, drug.deleteDrug]);
    //Order
router.post('/admin/getOrder', [requireAdmin, order.getDetailOfOrder]);
router.get('/admin/getAllOrders', [requireAdmin, order.getAllOrders]);
    //Prescription
router.get('/admin/getAllPrescriptions', [requireAdmin, prescription.getAllPrescriptions]);
router.post('/admin/acceptPrescription', [requireAdmin, prescription.acceptPrescription]);
router.post('/admin/rejectPrescription', [requireAdmin, prescription.rejectPrescription]);
router.post('/admin/getPrescriptionDetail', [requireAdmin, prescription.getPrescriptionDetailAdmin]);

//----------------------------------------------------------------


module.exports = router;
