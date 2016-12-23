'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = require('express')();
var path = require('path');

module.exports = app; // for testing

var config = {
	appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }

	app.get('/', function(req, res, next) {
	 	res.sendFile(path.join(__dirname + '/app/index.html'));
	});
	app.use("/styles", express.static(__dirname + '/app/css'));
	app.use("/scripts", express.static(__dirname + '/app/js'));

	// Serve the Swagger documents and Swagger UI
	app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;
	app.listen(port);
});