/* jshint strict:false */
/* jshint node: true */
/* jshint esversion: 6 */
'use strict';
    
var db = require('../../config/db')();

module.exports = {getAll, save, get, update, deleteUser};

function getAll(req, res, next) {
    res.json({ 
        users: db.find()
    });
}

function save(req, res, next) {
    var user = req.body;

    if (db.findByEmail(user.email)) {
        res.status(409).json({ message: "A user with the e-mail " + user.email + " alreedy exists."});
    } else {
        var newUser = db.save(user);
        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(202).send();
        }
    }
}

function get(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var user = db.find(id);

    if(user) {
        res.json(user);
    } else {
        res.status(204).json({ message: "User could not be found"});
    }       
}

function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var user = req.body;
    var existingUser = db.find(id);
    var doUpdate = true;

    if (existingUser && existingUser.email !== user.email) {
        if (db.findByEmail(user.email)) {
            doUpdate = false;
            res.status(409).json({ message: "A user with the e-mail " + user.email + " alreedy exists."});
        }
    } 

    if (doUpdate) {
        var updatedUser = db.update(id, user);

        if(updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(204).json({ status: 0, description: "User could not be found"});
        }
    }
}

function deleteUser(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    if(db.remove(id)) {
        res.json({
            success: 1, description: "User has been deleted!"
        });
    } else{ 
        res.status(204).json({ status: 0, description: "User could not be found"});
    }
}