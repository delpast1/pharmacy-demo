'use strict';
var db = require('../config/index').db;

//
var newOrder = (req, res) => {
    var customerId = req.decoded.id,
        drugs = req.body.drugs,
        dateOrder = req.body.date;

    var date = new Date(dateOrder);
    var workflow = new (require('events').EventEmitter)();
    var errors = [];
    var orderDetail = [];
    var totalPrice = 0;

    workflow.on('validateParams', ()=>{
        if (!drugs.length) {
            errors.push('Order empty.');
        };
        if (!date){
            errors.push('Date required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('checkOrder');
        };
    });

    workflow.on('checkOrder', () => {
        for(var i = 0; i < drugs.length; i++){
            var sql = "SELECT * FROM drug where id = ?";
            var drug = drugs[i];
            db.query(sql, [drug.id], function(err,result){
                var id = drug.id;
                if (err) throw err;
                if (result.length === 0) {
                    errors.push(id);
                } else {
                    var trueDrug = JSON.parse(JSON.stringify(result));

                    orderDetail.push({
                        drugId: trueDrug[0].id,
                        quantity: drug.quantity,
                        price: trueDrug[0].price
                    });
                }
            });
        };

        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('addOrder');
        };
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('addOrder', () => {
        var order = [[customerId, date]];
        var sql = "INSERT INTO drugorder (customer_id, date) VALUES ?";
        db.query(sql, [order], function(err, result) {
            if (err) throw err;
            var order = JSON.parse(JSON.stringify(result));
            workflow.emit('addOrderDetail', order.insertId);
        });
    });

    workflow.on('addOrderDetail', (orderId) => {
        for(var i=0; i < orderDetail.length; i++){
            var sql = "INSERT INTO orderdetail (id_order, id_drug, quantity, unit_price) VALUES (?, ?, ?, ?)";
            var detail = orderDetail[i];
            totalPrice += detail.quantity*detail.price;
            db.query(sql, [orderId, detail.drugId, detail.quantity, detail.price], function(err, result) {
                if (err) throw err;
            });
        };

        workflow.emit('totalPrice', totalPrice, orderId);
    });

    workflow.on('totalPrice', (totalPrice, orderId) => {
        var sql = "UPDATE drugorder SET total_price = ? WHERE id = ?";
        db.query(sql, [totalPrice, orderId], function(err, result){
            if (err) throw err;
            res.json({
                errors: errors
            });
        });
    });
    
    workflow.emit('validateParams');
}

// for admin
var getAllOrders = (req, res) => {
    var sql = "SELECT * FROM drugorder";
    db.query(sql, function(err, result){
    if (err) throw err;
        var drugorders=JSON.parse(JSON.stringify(result));
        res.json({
            allOrder: drugorders
        });
    });
}

//for Customer
var getOrderHistory = (req, res) => {
    var customerId = req.decoded.id;
    var sql = "SELECT * FROM drugorder WHERE customer_id = ?";
    db.query(sql,[customerId] , function(err, result){
        if (err) throw err;
        var drugorders=JSON.parse(JSON.stringify(result));
        res.json({
            allOrder: drugorders
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
            db.query(sql, [orderId], function(err, result){
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
        workflow.on('getOrderDetail', (order) => {
            db.query(sql2, [orderId], function(err, result){
                if (err) throw err;
                var orderDetail = JSON.parse(JSON.stringify(result));
                workflow.emit('response', order, orderDetail);
            });
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
            db.query(sql, [orderId, customerId], function(err, result){
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
        workflow.on('getOrderDetail', (order) => {
            db.query(sql2, [orderId], function(err, result){
                if (err) throw err;
                var orderDetail = JSON.parse(JSON.stringify(result));
                workflow.emit('response', order, orderDetail);
            });
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