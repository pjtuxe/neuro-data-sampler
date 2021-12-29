const fs = require('fs')
const RecordEntry = require('./models/record/entry.model')
const { parse } = require('json2csv');

async function main() {
  // Initalize MongoDB connections
  await require('./services/mongo.service').init()
  var entries = await RecordEntry.find()
  var result = []

  entries.forEach(entry => {
    var _entry = {};

    [
      'CP6',
      'F6',
      'C4',
      'CP4',
      'CP3',
      'F5',
      'C3',
      'CP5',
    ].forEach(channel => {
      entry.data[channel].forEach(_data => {
        var key = channel + '_' + entry.data[channel].indexOf(_data)
        _entry[key] = _data
      })
    })

    _entry.label = entry.label || "nothing"
    result.push(_entry)
  })

  try {
    const csv = parse(result, {
      fields: Object.keys(result[0])
    });
    fs.writeFileSync('output.csv', csv)
  } catch (err) {
    console.error(err);
  }

  process.exit(0)
}

main()
