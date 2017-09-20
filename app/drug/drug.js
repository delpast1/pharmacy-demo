'use strict';
var db = require('../config/index').db;

//
var getDrug = (req,res) => {
    var drugId = req.body.drugId;
    if (!drugId) {
        res.json({
            errors: ['ID of Drug is required.'],
        });
    } else {
        var sql = "SELECT * FROM drug WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql,[drugId], function(err, result){
                connection.destroy();
                if (err) throw err;
                var drug=JSON.parse(JSON.stringify(result));
                var errors = [];
                if (!drug[0]) {
                    errors.push('Drug does not exist.'); 
                    res.json({
                        errors: errors
                    });
                } else {
                    res.json({
                        drug: drug[0]
                    });
                }
            });
        });
    }
}

//
var getListOfDrug = (req, res) => {
    var sql = "SELECT * FROM drug";
    db.getConnection((err, connection) => {
        connection.query(sql, function(err, result){
            connection.destroy();
            if (err) throw err;
            var drugs=JSON.parse(JSON.stringify(result));
            res.json({
                listOfDrug: drugs
            });
        });
    });
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     var drugs=JSON.parse(JSON.stringify(result));
    //     res.json({
    //         listOfDrug: drugs
    //     });
    // });
};

// 
var addDrug = (req, res) => {
    var name = req.body.name;
    
    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!name){
            errors.push('Name required');
        };

        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('addDrug');
        }
    });

    workflow.on('errors', (errors)=> {
        res.json({ 
            errors: errors
        });
    });

    workflow.on('addDrug', () => {
        var drug = [[name]];
        var sql = "INSERT INTO drug (name) VALUES ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [drug], function(err, result) {
                connection.destroy();
                if (err) throw err;
                res.json({ 
                    errors: errors
                });
            });
        });
    });

    workflow.emit('validateParams');
}

// 
var updateDrug = (req, res) => {
    var drugId = req.body.drugId,
        name = req.body.name;

    var workflow = new (require('events').EventEmitter)();
    var errors = [];

    workflow.on('validateParams', ()=>{
        if (!drugId){
            errors.push('Id of drug required');
        }
        if (!name){
            errors.push('Name required');
        };
        if (errors.length){
            workflow.emit('errors', errors);
        } else {
            workflow.emit('updateDrug');
        }
        
    });
    workflow.on('errors', (errors)=>{
        res.json({
            errors: errors
        });
    });
    workflow.on('updateDrug', ()=> {
        var sql = "UPDATE drug SET name = ? WHERE id = ?";
        db.getConnection((err, connection) =>{
            connection.query(sql,[name, drugId], function(err, result){
                connection.destroy();
                if (err) throw err;
                var drug=JSON.parse(JSON.stringify(result));
                if (!drug.affectedRows) {
                    errors.push('Drug is not defined.')
                };
                    
                res.json({
                    errors: errors
                });
            });
        });
    });
    workflow.emit('validateParams');
};

//
var deleteDrug = (req, res) => {
    var drugId = req.body.drugId;
    if (!drugId) {
        res.json({
            errors: ['Id of Drug required.']
        });
    } else {
        var sql = "DELETE FROM drug WHERE id = ?";
        db.getConnection((err, connection) => {
            connection.query(sql, [drugId], function(err, result) {
                connection.destroy();
                if (err) throw err;
                res.json({
                    errors: []
                });
            });
        })
        // db.query(sql, [drugId], function(err, result) {
        //     if (err) throw err;
        //     res.json({
        //         errors: []
        //     });
        // });
    }
}

exports = module.exports = {
    getDrug: getDrug,
    getListOfDrug: getListOfDrug,
    addDrug: addDrug,
    updateDrug: updateDrug,
    deleteDrug: deleteDrug

}