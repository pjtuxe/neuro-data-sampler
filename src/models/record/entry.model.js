const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  method: String,
  datetime: Date,
  data: Object,
  label: String,
})

module.exports = mongoose.model('RecordEntry', entrySchema)
