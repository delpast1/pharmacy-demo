'use strict';
var db = require('../config/index').db;
const secret = require('../config/index').secret;
var jwt = require('jsonwebtoken');

var signin = (req, res) => {
    var email = req.body.email,
        password= req.body.password;

    var token = {},
        errors = '',
        status = '',
        data = {},
        role = '';
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
                    data = customer[0];
                    if (customer[0].email !== 'admin@pharmacy.com') {
                        role = 'customer';
                    } else {
                        role = 'admin';
                    }
                }
            }
        };

        if ( errors.length !== 0 ) {
            res.json({
                status: status,
                errors: errors,
                token: token
            });
        } else {
            var sign = {
                id: data.id,
                email: data.email,
                role: role
            };
            status = 'Login successfully.'
            token = jwt.sign(sign, secret, {
                
            });
            res.json({
                status: status,
                errors: errors,
                token: token
            });
        }
    });
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
    var message = [];
    var token = '';

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
            workflow.emit('errors');
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
                    workflow.emit('errors');
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
            message.push('Sign up successfully.');
            
            var data=JSON.parse(JSON.stringify(result));
            var sign = {
                id: data.insertId,
                email: email,
                role: 'customer'
            };

            token = jwt.sign(sign, secret, {
    
            });

            res.json({ 
                result: message,
                error: errors,
                token: token
            });
        });
    });
    
    workflow.on('errors', ()=> {
        res.json({ 
            result: message,
            error: errors,
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
                message: 'These are all our customers.',
                listOfCustomers: customers
            });
        });
    } else {
        res.json({
            message: 'Sorry, you are not admin.'
        });
    }
};

var getInformation = (req,res) => {
    var id = req.decoded.id;
    var sql = "SELECT address, fullname, phonenumber FROM customers WHERE id = ?";

    db.query(sql,[id], function(err, result){
        if (err) throw err;
        var customers=JSON.parse(JSON.stringify(result));
        var errors = [];
        if (!customers[0]) {
            errors.push('Customer does not exist.'); 
        }
        res.json({
            errors: errors.length !== 0 ? errors : null,
            customerInfo: errors.length === 0 ? customers[0] : null
        })
    });
}
var updatePassword = (req, res) => {
        var id = req.decoded.id,
            password = req.body.password,
            confirmPassword = req.body.confirmPassword;
        var workflow = new (require('events').EventEmitter)();
        var error = [];
        workflow.on('checkPassword',()=>{
            if (!password || !confirmPassword) {
                error.push('Password required.');
                workflow.emit('error',error);
            } else if (password !== confirmPassword){
                error.push('These passwords don\'t match.');
                workflow.emit('error',error);
            } else {
                workflow.emit('changePassword');
            }
        });
        workflow.on('error', (error)=> {
            res.json({
                code: '4',
                errors: error
            });
        });
        workflow.on('changePassword', ()=> {
            var sql = "UPDATE customers SET password = ? WHERE id = ?"
            db.query(sql, [password, id], function(err, result) {
                if (err) throw err;
                res.json({
                    message: "Change password successly."
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
            code: '4',
            errors: errors
        });
    });
    workflow.on('updateInfo', ()=> {
        var sql = "UPDATE customers SET address = ?, fullname = ?, phonenumber = ? WHERE id = ?";
        db.query(sql,[address, fullname, phonenumber, id], function(err, result){
            if (err) throw err;
            res.json({
                message: "Update information successly."
            });
        });
    });
    workflow.emit('validateParams');
};

exports = module.exports = {
    signin: signin,
    signUp: signUp,
    listOfCustomers: listOfCustomers,
    updatePassword: updatePassword,
    updatePersonalInfo: updatePersonalInfo,
    getInformation: getInformation
}