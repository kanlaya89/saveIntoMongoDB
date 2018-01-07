var mqtt = require('mqtt')
var moment = require('moment')

const Broker = require("./config").Broker

var client = mqtt.connect(`mqtts://${Broker.Server}:${Broker.SSL_Port}`,{username: Broker.User, password: Broker.Password})
var dataToSave
client.on('connect', function(ck) {
  console.log('Connected to Broker')
});
client.on('error', function(err) {
  console.log('Connecte error: ', err)
});

client.subscribe('#');
// client.publish('test', 'hello from MacBook!')

client.on('message', function(topic, message) {
  console.log(topic, JSON.parse(message));
  dataToSave = JSON.parse(message)
  dataToSave['created_at'] = moment().format()
  dataToSave['topic_name'] = topic

  var mycol = db.collection('mqtt')
  mycol.save(dataToSave)

  });

var mqttClient = {
    publish: function(topic, message) {
        client.publish(topic, message)
    },
    subscribe: function(topic, message) {
        client.subscribe(topic, message)
    }


}
module.exports.mqttClient = mqttClient
   