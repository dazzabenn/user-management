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
    var newUser = db.save(req.body);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(202).send();
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
    var updatedUser = db.update(id, user);

    if(updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(204).json({ message: "User could not be found"});
    }

}

function deleteUser(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters

    if(db.remove(id)) {
        res.json({
          success: 1, description: "User has been deleted!"
        });
    } else{ 
        res.status(204).json({ message: "User could not be found"});
    }

}