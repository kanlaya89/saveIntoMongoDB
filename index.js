var router = require("express").Router()
// var config = require('../config')
// var mqtt = require('../mqtt.js').mqttClient

// router.use("/topic", require("./topic.router.js"))
// router.use("/broker", require("./broker.router.js"))

router.get('/', function(req, res) {
    res.sendFile(config.rootPath + '/public/html/index.html')
})

module.exports = router;
