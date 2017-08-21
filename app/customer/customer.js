'use strict';
var db = require('../config/index').db;
const secret = require('../config/index').secret;
var jwt = require('jsonwebtoken');

var signin = (req, res) => {
    var email = req.body.email,
        password= req.body.password;

    var errors = [];
    var token = [],
        data = {},
        role = '';

    var workflow = new (require('events').EventEmitter)();
    workflow.on('validateParams', ()=> {
        if (!email){
            errors.push('Email required');
        };
        if (!password){
            errors.push('Password required');
        };
        workflow.emit('finishValidate', errors);
    });

    workflow.on('finishValidate', (errors)=>{
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('login');
        }
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors,
            token: token
        });
    });
    
    workflow.on('login', () => {
        var sql = "SELECT * FROM customers WHERE email = ?";
        //Find customer
        db.query(sql,[email] ,function(err, result){
            if (err) throw err
            else  {
                var customer=JSON.parse(JSON.stringify(result));

                if (!customer[0]) {
                    errors= 'Customer does not exist.'; 
                } else {
                    if (customer[0].password != password) {
                        errors = 'Wrong password.';
                    } else {
                        if (customer[0].email !== 'admin@pharmacy.com') {
                            role = 'customer';
                        } else {
                            role = 'admin';
                        }

                        data = {
                            id: customer[0].id,
                            email: customer[0].email,
                            address: customer[0].address,
                            fullname: customer[0].fullname,
                            phonenumber: customer[0].fullname,
                            role: role
                        };
                    }
                }
            };

            if ( errors.length !== 0 ) {
                res.json({
                    errors: errors,
                    userInfo: data,
                    token: token
                });
            } else {
                var sign = {
                    id: data.id,
                    email: data.email,
                    role: role
                };
                token = jwt.sign(sign, secret, {
                    
                });
                res.json({
                    errors: errors,
                    userInfo: data,
                    token: token
                });
            }
        });
    });
    workflow.emit('validateParams');
};

var signUp = (req, res) => {
    var email = req.body.email,
        password = req.body.password,
        address = req.body.address,
        fullname = req.body.fullname,
        phonenumber = req.body.phonenumber;

    //Validate
    var workflow = new (require('events').EventEmitter)();
    var errors = [];
    var token = [],
        data = {};

    workflow.on('validateParams', ()=>{
        if (!email){
            errors.push('Email required');
        } else {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(email)){
                errors.push('This is not correct email address.')
            } 
        }
        if (!password){
            errors.push('Password required');
        };
        if (!address){
            errors.push('Address required');
        };
        if (!fullname){
            errors.push('Fullname required');
        };
        if (!phonenumber){
            errors.push('Phonenumber required');
        };
        workflow.emit('finishValidate', errors);
    });

    workflow.on('finishValidate', (errors)=>{
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('checkExist');
        }
    });

    workflow.on('checkExist', () => {
        var sql = "SELECT * FROM customers WHERE email = ?";
        db.query(sql,[email] ,function(err, result){
            if (err) throw err
            else  {
                var customer=JSON.parse(JSON.stringify(result));
                if (customer[0]) {
                    errors.push('Existed customer.')
                    workflow.emit('errors', errors);
                } else {
                    workflow.emit('addCustomer');
                }
            }
        });
    });

    workflow.on('addCustomer', () => {
        var customers = [[email, password, address, fullname, phonenumber]];
        var sql = "INSERT INTO customers (email, password, address, fullname, phonenumber) VALUES ?";

        db.query(sql, [customers], function(err, result) {
            if (err) throw err;
            
            var customer=JSON.parse(JSON.stringify(result));
            console.log(customer);
            var sign = {
                id: customer.insertId,
                email: email,
                role: 'customer'
            };

            data = {
                id: customer.insertId,
                email: email,
                address: address,
                fullname: fullname,
                phonenumber: fullname,
                role: sign.role
            };
            token = jwt.sign(sign, secret, {
    
            });

            res.json({ 
                errors: errors,
                userInfo: data,
                token: token
            });
        });
    });
    
    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors,
            userInfo: data,
            token: token
        });
    });

    workflow.emit('validateParams');
};

var listOfCustomers = (req, res) => {
    if (req.decoded.role === 'admin'){
        var sql = "SELECT * FROM customers";
        db.query(sql, function(err, result){
            if (err) throw err;
            var customers=JSON.parse(JSON.stringify(result));
            res.json({
                listOfCustomers: customers
            });
        });
    } else {
        res.json({
            errors: ['You are not admin.']
        });
    }
};

var getInformation = (req,res) => {
    var id = req.decoded.id;
    var sql = "SELECT email, address, fullname, phonenumber FROM customers WHERE id = ?";

    db.query(sql,[id], function(err, result){
        if (err) throw err;
        var customers=JSON.parse(JSON.stringify(result));
        var errors = [];
        if (!customers[0]) {
            errors.push('Customer does not exist.'); 
        }
        res.json({
            errors: errors,
            customerInfo: customers[0]
        })
    });
}
var updatePassword = (req, res) => {
        var id = req.decoded.id,
            password = req.body.password,
            confirmPassword = req.body.confirmPassword;
        var workflow = new (require('events').EventEmitter)();
        var errors = [];
        workflow.on('checkPassword',()=>{
            if (!password || !confirmPassword) {
                errors.push('Password required.');
                workflow.emit('errors',errors);
            } else if (password !== confirmPassword){
                errors.push('These passwords don\'t match.');
                workflow.emit('errors',errors);
            } else {
                workflow.emit('changePassword');
            }
        });

        workflow.on('errors', (errors)=> {
            res.json({
                errors: errors
            });
        });

        workflow.on('changePassword', ()=> {
            var sql = "UPDATE customers SET password = ? WHERE id = ?"
            db.query(sql, [password, id], function(err, result) {
                if (err) throw err;
                res.json({
                    errors: errors
                });
            });
        });
        workflow.emit('checkPassword');
};

var updatePersonalInfo = (req, res) => {
    var id = req.decoded.id,
        address = req.body.address,
        fullname = req.body.fullname,
        phonenumber = req.body.phonenumber;

    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!address){
            errors.push('Address required');
        };
        if (!fullname){
            errors.push('Fullname required');
        };
        if (!phonenumber){
            errors.push('Phonenumber required');
        };

        if (errors.length){
            workflow.emit('error', errors);
        } else {
            workflow.emit('updateInfo');
        }
        
    });
    workflow.on('error', (errors)=>{
        res.json({
            errors: errors
        });
    });
    workflow.on('updateInfo', ()=> {
        var sql = "UPDATE customers SET address = ?, fullname = ?, phonenumber = ? WHERE id = ?";
        db.query(sql,[address, fullname, phonenumber, id], function(err, result){
            if (err) throw err;
            res.json({
                errors: errors
            });
        });
    });
    workflow.emit('validateParams');
};

var checkCurrentPassword = (req, res) => {
    var id = req.decoded.id,
        currentPassword =  req.body.currentPassword;
    
    var errors = [],
        rightPassword = false;
    var workflow = new (require('events').EventEmitter)();
    workflow.on('checkPassword',()=>{
        if (!currentPassword) {
            errors.push('Password required.');
            workflow.emit('errors',errors);
        } else {
            workflow.emit('confirmPassword');
        }
    });

    workflow.on('errors', (errors)=> {
        res.json({
            errors: errors
        });
    });
    workflow.on('confirmPassword', () => {
        var sql = "SELECT * FROM customers WHERE id = ? and password = ?";
        db.query(sql,[id, currentPassword],function(err, result) {
            if (err) throw err;
            var customer=JSON.parse(JSON.stringify(result));
            if (!customer.length) {
                rightPassword = false;
            } else {
                rightPassword = true;
            };
            res.json({
                errors: errors,
                rightPassword: rightPassword
            });
        });
    });
    workflow.emit('checkPassword');
};
exports = module.exports = {
    signin: signin,
    signUp: signUp,
    listOfCustomers: listOfCustomers,
    updatePassword: updatePassword,
    updatePersonalInfo: updatePersonalInfo,
    getInformation: getInformation,
    checkCurrentPassword: checkCurrentPassword
}