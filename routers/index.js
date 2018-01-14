var router = require("express").Router()
var moment = require('moment')
const _ = require("lodash")

// Collection Name
var mycol = db.collection('mqtt')

// Finds the distinct values for a specified field
findDistinct = (data, ck) => {
	mycol.distinct(data, (err, items) => {
		if(err) { console.log(err) }
		return ck(items)
	})
}


router.get('/', (req, res) => {
    res.sendFile(config.rootPath + '/public/html/index.html')

})

router.get('/findDistinct/:data', (req, res) => {
	var data = req.params.data
	findDistinct(data, (ck) => {
		res.send(ck)
	})
})

router.get('/findAllDistinct', (req, res) => {
	var dataToSend = {}
	findDistinct('topic_name', (ck1) => {
		dataToSend['topic_names'] = ck1
		findDistinct('mac', (ck2) => {
			dataToSend['macs'] = ck2
			res.send(dataToSend)
		})
	})
})

router.get('/time/:from_day/:from_time/to/:to_day/:to_time', (req, res) => {
	console.log("time triggered")
	var from_day = req.params.from_day,
			from_time = req.params.from_time,
			to_day = req.params.to_day,
			to_time = req.params.to_time
	var from = moment(from_day + 'T' + from_time).format()
			to = moment(to_day + 'T' + to_time).format()

	console.log('FROM ', from, 'TO ', to)
	mycol.find({
		"created_at": { $gte: from , $lte: to } 
	}, { _id: 0 }).toArray( (err, items) => {
		if (err) { return res.send(err) }
		res.send(items)
	})
})

router.get('/findTopicMac/:topic_name/:mac', (req, res) => {
	var topic_name = req.params.topic_name
			mac = req.params.mac
	var query = {}
	if(topic_name != 'null') {
		query['topic_name'] = topic_name
	}
	if(mac != 'null') {
		query['mac'] = mac
	}

	console.log('query', query)

	// if(!_.isEmpty(query)) {
		mycol.find(query).toArray( (err, items) => {
			if (err) { return res.send(err)}
			res.send(items)
		})
	// }
})

module.exports = router;
