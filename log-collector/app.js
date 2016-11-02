var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var kafka = require('kafka-node')

app.use(bodyParser.json())

app.post('/api/events', function (req, res) {
  // fs.appendFile('./logs', JSON.stringify(req.body) + '\r\n', function (err) {
  //   if (!err) {
  res.status(200).send(req.body)
  //   } else {
  //     res.status(500).send('Fail')
  //   }
  // })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
