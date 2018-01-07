var router = require("express").Router()
var moment = require('moment')

// collection name
var mycol = db.collection('mqtt')

router.get('/', (req, res) => {
    res.sendFile(config.rootPath + '/public/html/index.html')

})

router.get('/getDistinctOf/:data', (req, res) => {
	var data = req.params.data
	mycol.distinct(data, (err, items) => {
		if(err) { res.send(err) }
		res.send(items)
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

router.get('/find/:name/:value', (req, res) => {
	var name = req.params.name
			value = req.params.value

	console.log('name:', name, 'value:', value)
	mycol.find({ [name] : value }).toArray( (err, items) => {
		if (err) { return res.send(err)}
		res.send(items)
	})
})

module.exports = router;
