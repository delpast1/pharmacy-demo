'use strict';
var db = require('../config/index').db;

//
var newOrder = (req, res) => {
    var customerId = req.decoded.id,
        drugs = req.body.drugs,
        dateOrder = req.body.date,
        prescriptionID = req.body.prescriptionID;

    var date = new Date(dateOrder);
    var workflow = new (require('events').EventEmitter)();
    var errors = [];
    var orderDetail = [];
    var totalPrice = 0;
    var listDrugs = [];
    var flat = 0;
    var totalPrice = 0;
    var length = drugs.length;

    workflow.on('validateParams', ()=>{
        if (!drugs.length) {
            errors.push('Order empty.');
        };
        if (!dateOrder){
            errors.push('Date required.');
        }
        if (!prescriptionID){
            errors.push('Prescription ID required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('checkPrescription');
        };
    });

    workflow.on('checkPrescription', () => {
        var sql = "SELECT status FROM `prescription` WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [prescriptionID], function(err, result) {
                connection.destroy();
                if (err) throw err;
                var results =  JSON.parse(JSON.stringify(result));
                if (results.length === 0) {
                    errors.push('This prescription is not available.');
                } else if (results[0].status === 0) {
                    errors.push('This prescription needs to be accepted.');
                } else if (results[0].status === 2){
                    errors.push('This prescription has been rejected.');
                }
                if (errors.length){
                    workflow.emit('errors', errors);
                } else {
                    var sql = "SELECT id_drug as drugID FROM prescriptiondetail WHERE id_prescription = ?";
                    db.getConnection((err, connection) => {
                        connection.query(sql, [prescriptionID], function(err, result) {
                            connection.destroy();
                            if (err) throw err;
                            listDrugs  = JSON.parse(JSON.stringify(result));    
                            workflow.emit('checkOrder', listDrugs);
                        });
                    });
                };
            });
        });
    });
    workflow.on('checkOrder', (listDrugs) => {
        for (var i=0; i< drugs.length; i++) {
            for(var j=0; j< listDrugs.length; j++) {
                var check = false;
                if (drugs[i].id === listDrugs[j].drugID) {
                    check = true;
                    break;
                }
            }
            if (check === false) {
                //trả lại id của những loại thuốc không có trong prescription
                errors.push(drugs[i].id);
            }
        }
        if (errors.length) {
            workflow.emit('errors', errors);
        } else {
            workflow.emit('addOrder');
        }
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('addOrder', () => {
        var order = [[customerId, date, 0, prescriptionID]];
        var sql = "INSERT INTO drugorder (customer_id, date, total_price, prescription_id) VALUES ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [order], function(err, result) {
                connection.destroy();
                if (err) throw err;
                var order = JSON.parse(JSON.stringify(result));
                workflow.emit('orderDetail', order.insertId);
            });
        });
    });

    workflow.on('orderDetail', (orderId) => {
        
        for(var i=0; i < drugs.length; i++){
            var drug = drugs[i];
            workflow.emit('addOrderDetail',drug,orderId);
        };
    });
    
    workflow.on('addOrderDetail', (drug, orderId)=>{
        console.log('check');
        var sql1 = "INSERT INTO orderdetail (id_order, id_drug, quantity, unit_price) VALUES (?, ?, ?, ?)";
        var sql2 = "SELECT price FROM `drug` WHERE id = ?";
        
        db.getConnection((err, connection) => {
            connection.query(sql2, [drug.id], function(err, result) {
                if (err) throw err;
                var results = JSON.parse(JSON.stringify(result));
                totalPrice += drug.quantity*results[0].price;
                connection.query(sql1, [orderId, drug.id, drug.quantity, result[0].price], function(err, result) {
                    flat++;
                    connection.destroy();
                    if (err) throw err;
                    if (flat === drugs.length) {
                        workflow.emit('totalPrice', totalPrice, orderId);
                    }
                });
            });
        });
    });

    workflow.on('totalPrice', (totalPrice, orderId) => {
        var sql = "UPDATE drugorder SET total_price = ? WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [totalPrice, orderId], function(err, result){
                connection.destroy();
                if (err) throw err;
                res.json({
                    errors: errors
                });
            });
        });
        // db.query(sql, [totalPrice, orderId], function(err, result){
        //     if (err) throw err;
        //     res.json({
        //         errors: errors
        //     });
        // });
    });
    
    workflow.emit('validateParams');
}

// for admin
var getAllOrders = (req, res) => {
    var sql = "SELECT * FROM drugorder";
    db.getConnection((err, connection) => {
        connection.query(sql, function(err, result){
            connection.destroy();
            if (err) throw err;
                var drugorders=JSON.parse(JSON.stringify(result));
                res.json({
                    allOrder: drugorders
                });
            });
    });
    // db.query(sql, function(err, result){
    // if (err) throw err;
    //     var drugorders=JSON.parse(JSON.stringify(result));
    //     res.json({
    //         allOrder: drugorders
    //     });
    // });
}

//for Customer
var getOrderHistory = (req, res) => {
    var customerId = req.decoded.id;
    var sql = "SELECT * FROM drugorder WHERE customer_id = ?";
    db.getConnection((err, connection) => {
        connection.query(sql,[customerId] , function(err, result){
            connection.destroy();
            if (err) throw err;
            var drugorders=JSON.parse(JSON.stringify(result));
            res.json({
                allOrder: drugorders
            });
        });
    });
}

// for admin
var getDetailOfOrder = (req, res) => {
    var orderId = req.body.orderId;
    var workflow = new (require('events').EventEmitter)();

    if (!orderId) {
        res.json({
            errors: ['Order number required.']
        });
    } else {
        var sql = "SELECT * FROM drugorder WHERE id = ?";
        var sql2 = "SELECT id_drug, quantity, unit_price FROM orderdetail WHERE id_order = ?";

        workflow.on('getOrder', () => {
            db.getConnection((err, connection) => {
                connection.query(sql, [orderId], function(err, result){
                    connection.destroy();
                    if (err) throw err;
                    var order = JSON.parse(JSON.stringify(result));
                    if (!order[0]) {
                        res.json({
                            errors: ['This order is not defined.']
                        })
                    } else {
                        workflow.emit('getOrderDetail', order);
                    }  
                });
            });
            // db.query(sql, [orderId], function(err, result){
            //     if (err) throw err;
            //     var order = JSON.parse(JSON.stringify(result));
            //     if (!order[0]) {
            //         res.json({
            //             errors: ['This order is not defined.']
            //         })
            //     } else {
            //         workflow.emit('getOrderDetail', order);
            //     }  
            // });
        });
        workflow.on('getOrderDetail', (order) => {
            db.getConnection((err, connection) => {
                connection.query(sql2, [orderId], function(err, result){
                    connection.destroy();
                    if (err) throw err;
                    var orderDetail = JSON.parse(JSON.stringify(result));
                    workflow.emit('response', order, orderDetail);
                });
            });
            // db.query(sql2, [orderId], function(err, result){
            //     if (err) throw err;
            //     var orderDetail = JSON.parse(JSON.stringify(result));
            //     workflow.emit('response', order, orderDetail);
            // });
        });
        workflow.on('response', (order, orderDetail) => {
            
            res.json({
                orderNumber: order[0].id,
                customerId: order[0].customer_id,
                date: order[0].date.toString(),
                totalPrice: order[0].total_price,
                drugs: orderDetail
            })
        });
        workflow.emit('getOrder');
    }
}

var getDetailOfOrderByCustomer = (req, res) => {
    var orderId = req.body.orderId,
        customerId = req.decoded.id;
    var workflow = new (require('events').EventEmitter)();

    if (!orderId) {
        res.json({
            errors: ['Order number required.']
        });
    } else {
        var sql = "SELECT * FROM drugorder WHERE id = ? and customer_id = ?";
        var sql2 = "SELECT id_drug, quantity, unit_price FROM orderdetail WHERE id_order = ?";

        workflow.on('getOrder', () => {
            db.getConnection((err, connection) => {
                connection.query(sql, [orderId, customerId], function(err, result){
                    connection.destroy();
                    if (err) throw err;
                    var order = JSON.parse(JSON.stringify(result));
                    if (!order[0]) {
                        res.json({
                            errors: ['This is not your order.']
                        })
                    } else {
                        workflow.emit('getOrderDetail', order);
                    }  
                });
            });
            // db.query(sql, [orderId, customerId], function(err, result){
            //     if (err) throw err;
            //     var order = JSON.parse(JSON.stringify(result));
            //     if (!order[0]) {
            //         res.json({
            //             errors: ['This is not your order.']
            //         })
            //     } else {
            //         workflow.emit('getOrderDetail', order);
            //     }  
            // });
        });
        workflow.on('getOrderDetail', (order) => {
            db.getConnection((err, connection) => {
                connection.query(sql2, [orderId], function(err, result){
                    connection.destroy();
                    if (err) throw err;
                    var orderDetail = JSON.parse(JSON.stringify(result));
                    workflow.emit('response', order, orderDetail);
                });
            });
            // db.query(sql2, [orderId], function(err, result){
            //     if (err) throw err;
            //     var orderDetail = JSON.parse(JSON.stringify(result));
            //     workflow.emit('response', order, orderDetail);
            // });
        });
        workflow.on('response', (order, orderDetail) => {
            
            res.json({
                orderNumber: order[0].id,
                customerId: order[0].customer_id,
                date: order[0].date.toString(),
                totalPrice: order[0].total_price,
                drugs: orderDetail
            })
        });
        workflow.emit('getOrder');
    }
}


exports = module.exports = {
    newOrder: newOrder,
    getAllOrders: getAllOrders,
    getDetailOfOrder: getDetailOfOrder,
    getOrderHistory: getOrderHistory,
    getDetailOfOrderByCustomer: getDetailOfOrderByCustomer
}