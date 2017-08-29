'use strict';
var db = require('../config/index').db;

//
var newOrder = (req, res) => {
    var customerId = req.decoded.id,
        drugs = req.body.drugs,
        date = req.body.date;
        
    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!drugs) {
            errors.push('Order empty.');
        };

        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('checkOrder');
        };
    });

    workflow.on('checkOrder', () => {
        drugs.array.forEach(function(drug) {
            var sql = "SELECT * FROM drug where id = ?";
            db.query(sql, [drug.id], function(err,result){
                if (err) throw err;
                if (!result) {
                    errors.push(drug.id);
                }
            });
        });

        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('addOrder');
        };
    });

    workflow.on('addOrder', () => {

    });

}

exports = module.exports = {
    newOrder: newOrder

}