
const express = require('express')
const bodyParser = require('body-parser')
const useragent = require('express-useragent')
const app = express()
const kafka = require('kafka-node')
const Producer = kafka.Producer
const client = new kafka.Client('zoo1:2181')
const producer = new Producer(client)

producer.on('ready', function () {
  app.use(bodyParser.json())
  app.use(useragent.express())

  app.get('/track', function (req, res) {
    req.query.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    req.query.useragent = req.useragent

    res.status(200).send(req.query)

    producer.send([{
      topic: 'events',
      messages: JSON.stringify(req.query),
      partition: 0
    }], function (err, data) {
      console.log(err || data)
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
