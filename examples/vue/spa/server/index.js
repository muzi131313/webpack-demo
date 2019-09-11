var express = require('express')
var app = new express()
var port = 3000

app.use(express.static('./dist'))

app.listen(port, () => {
  console.log(`serice start at: http://localhost:${port}`)
})
