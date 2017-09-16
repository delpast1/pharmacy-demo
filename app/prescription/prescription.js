'use strict';
var db = require('../config/index').db;

var newPrescription = (req, res) => {
    var customerId = req.decoded.id,
        drugs = req.body.drugs,
        date = req.body.date;

    var date = new Date(date);
    var workflow = new (require('events').EventEmitter)();
    var errors = [];
    var prescriptionDetail = [];

    workflow.on('validateParams', ()=>{
        if (!drugs.length) {
            errors.push('Prescription empty.');
        };
        if (!date){
            errors.push('Date required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('checkPrescription');
        };
    });

    workflow.on('checkPrescription', () => {
        var flat = 0;
        for(var i = 0; i < drugs.length; i++){
            var sql = "SELECT * FROM drug where id = ?";
            var drug = drugs[i];
            
            db.query(sql, [drug.id], function(err,result){
                flat++;  
                var length = drugs.length;
                if (err) throw err;
                if (result.length !== 0) {
                    var trueDrug = JSON.parse(JSON.stringify(result));
                    prescriptionDetail.push({
                        drugId: trueDrug[0].id
                    });
                } else {
                    errors.push(flat-1);
                }
                if (flat === length) {
                    if (errors.length !== 0){
                        workflow.emit('errors', errors);
                    } else {
                        workflow.emit('addPrescription');
                    };
                }
            });
        };
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('addPrescription', () => {
        var prescription = [[customerId, date, 0]];
        var sql = "INSERT INTO prescription (customer_id, date, status) VALUES ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [prescription], function(err, result) {
                connection.destroy();
                if (err) throw err;
                var prescription = JSON.parse(JSON.stringify(result));
                workflow.emit('addPrescriptionDetail', prescription.insertId);
            });
        });
        // workflow.emit('addPrescriptionDetail', prescription.insertId);
    });

    workflow.on('addPrescriptionDetail', (prescriptionID) => {
        var flat = 0;
        for(var i=0; i < prescriptionDetail.length; i++){
            flat++;
            var length = prescriptionDetail.length;
            var sql = "INSERT INTO prescriptiondetail (id_prescription, id_drug) VALUES (?, ?)";
            var detail = prescriptionDetail[i];
            db.query(sql, [prescriptionID, detail.drugId], function(err, result) {
                if (err) throw err;
            });
            if (flat === length) {
                res.json({
                    errors: errors
                });
            }
        };
    });
    
    workflow.emit('validateParams');
}

var acceptPrescription = (req, res) => {
    var prescriptionID = req.body.prescriptionID;
    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!prescriptionID){
            errors.push('Prescription ID required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('acceptPrescription');
        };
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('acceptPrescription', () => {
        var sql = "UPDATE prescription SET status = 1 WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [prescriptionID], function(err, result) {
                connection.destroy();
                if (err) throw err;
                var prescription = JSON.parse(JSON.stringify(result));
                if (prescription.affectedRows !== 0 ) {
                    res.json({
                        errors: errors
                    });
                } else {
                    errors.push('This prescription is not available.');
                    workflow.emit('errors', errors);
                }
            });
        });
    });

    workflow.emit('validateParams');
}

var rejectPrescription = (req, res) => {
    var prescriptionID = req.body.prescriptionID;
    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!prescriptionID){
            errors.push('Prescription ID required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('rejectPrescription');
        };
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('rejectPrescription', () => {
        var sql = "UPDATE prescription SET status = 2 WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [prescriptionID], function(err, result) {
                connection.destroy();
                if (err) throw err;
                var prescription = JSON.parse(JSON.stringify(result));
                if (prescription.affectedRows !== 0 ) {
                    res.json({
                        errors: errors
                    });
                } else {
                    errors.push('This prescription is not available.');
                    workflow.emit('errors', errors);
                }
            });
        });
    });

    workflow.emit('validateParams');
}

var getPrescriptionDetail = (req, res) => {
    var customerId = req.decoded.id;
    var prescriptionId = req.body.prescriptionID;

    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!prescriptionId){
            errors.push('Prescription ID required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('getPrescription');
        };
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('getPrescription', () => {
        var sql = "SELECT id, customer_id as customerId, date, status FROM prescription WHERE customer_id = ? AND id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql,[customerId, prescriptionId] , function(err, result){
                if (err) throw err;
                var prescription = JSON.parse(JSON.stringify(result));
                if (prescription.length === 0){
                    errors.push('This is not your prescription.');
                    workflow.emit('errors', errors);
                } else {
                    var sql2 = "SELECT id_drug as DrugID FROM prescriptiondetail WHERE id_prescription = ?";
                    connection.query(sql2, [prescriptionId], (err, result) => {
                        connection.destroy();
                        if (err) throw err;
                        var prescriptionDetail = JSON.parse(JSON.stringify(result));
                        res.json({
                            prescriptions: prescription,
                            prescriptionsDetail: prescriptionDetail
                        });
                    });
                }
            });
        });
    });

    workflow.emit('validateParams');
}
var getPrescriptionDetailAdmin = (req, res) => {
    var prescriptionId = req.body.prescriptionID;

    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!prescriptionId){
            errors.push('Prescription ID required.');
        }
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('getPrescription');
        };
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('getPrescription', () => {
        var sql = "SELECT id, customer_id as customerId, date, status FROM prescription WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql,[prescriptionId] , function(err, result){
                if (err) throw err;
                var prescription = JSON.parse(JSON.stringify(result));
                if (prescription.length === 0){
                    errors.push('This prescription is not availble.');
                    workflow.emit('errors', errors);
                } else {
                    var sql2 = "SELECT id_drug as DrugID FROM prescriptiondetail WHERE id_prescription = ?";
                    connection.query(sql2, [prescriptionId], (err, result) => {
                        connection.destroy();
                        if (err) throw err;
                        var prescriptionDetail = JSON.parse(JSON.stringify(result));
                        res.json({
                            prescriptions: prescription,
                            prescriptionsDetail: prescriptionDetail
                        });
                    });
                }
            });
        });
    });

    workflow.emit('validateParams');
}

var getPrescriptions = (req, res) => {
    var customerId = req.decoded.id;
    var sql = "SELECT * FROM prescription WHERE customer_id = ?";
    db.getConnection((err, connection) => {
        connection.query(sql,[customerId] , function(err, result){
            connection.destroy();
            if (err) throw err;
            var prescriptions = JSON.parse(JSON.stringify(result));
            res.json({
                prescriptions: prescriptions
            });
        });
    });
}
var getAllPrescriptions = (req, res) => {
    var sql = "SELECT * FROM prescription";
    db.getConnection((err, connection) => {
        connection.query(sql , function(err, result){
            connection.destroy();
            if (err) throw err;
            var prescriptions = JSON.parse(JSON.stringify(result));
            res.json({
                prescriptions: prescriptions
            });
        });
    });
}

exports = module.exports = {
    newPrescription: newPrescription,
    acceptPrescription: acceptPrescription,
    rejectPrescription: rejectPrescription,
    getPrescriptions: getPrescriptions,
    getAllPrescriptions: getAllPrescriptions,
    getPrescriptionDetail: getPrescriptionDetail,
    getPrescriptionDetailAdmin: getPrescriptionDetailAdmin
}