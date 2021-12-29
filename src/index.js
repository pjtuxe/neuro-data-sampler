const express = require('express')
const config = require('./services/config')
const app = express()
app.use(express.json())

app.get('/hc', (req, res) => {
  res.send('ok')
})

app.use('/', require('./controllers/record.controller'))

async function main() {
  await require('./services/mongo.service').init()
  app.listen(config.port, () => {
    console.log(`App listening on 0.0.0.0:${config.port}...`)
  })
}

main()
