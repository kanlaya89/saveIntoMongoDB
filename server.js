
var http = require('http')

/* DB Initialization */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'jikken201801';

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  global.db = client.db(dbName);
  var app = require('./app')
  /* End DB Initialization */

	var mqtt = require("./mqtt").mqttClient

	server = http.createServer(app)

	server.listen(3000, function() {
		console.log("Running http-server on port 3000")
	})

});


