
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client('zoo1:2181')
var producer = new Producer(client)

producer.on('ready', function () {
  app.use(bodyParser.json())

  app.post('/api/events', function (req, res) {
    var payloads = [
      {
        topic: 'events',
        messages: JSON.stringify(req.body),
        partition: 0
      }
    ]

    producer.send(payloads, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(err)
      }
    })
  })

  app.listen(3000, function () {
    console.log('Log collector is ready!')
  })
})

producer.on('error', function (err) {
  console.log('Error:')
  console.log(err)
})
