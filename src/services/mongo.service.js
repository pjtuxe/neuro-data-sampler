const mongoose = require('mongoose')
const config = require('./config')

module.exports = {
  init: async () => {
    await mongoose.connect(config.mongodb.uri)
    return mongoose
  }
}
