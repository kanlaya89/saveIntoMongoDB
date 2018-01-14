var http = require('http')

const MongoDB = require("./config").MongoDB

/* DB Initialization */
const MongoClient = require('mongodb').MongoClient;
const dbName = MongoDB.DBName;
const url = `mongodb://${MongoDB.User}:${MongoDB.Password}@localhost/${dbName}`


MongoClient.connect(url, function(err, client) {
	if (err) return console.log(err)
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


