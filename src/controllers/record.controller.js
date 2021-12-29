const router = require('express').Router()
const RecordEntry = require('./../models/record/entry.model')

router.post('/v1/record', async (req, res) => {
  if (!req.body.seconds || req.body.seconds < 1) {
    throw new Error('Invalid "seconds" parameter given')
  }

  if (!req.body.method || ["raw", "psd"].indexOf(req.body.method) < 0) {
    throw new Error('Invalid "method" parameter given')
  }

  const service = await require('./../services/notion.service')()
  let samples = 0
  const subscription = service
    .brainwaves(req.body.method)
    .subscribe(brainwaves => {
      samples++
      console.log(brainwaves)
      var entry = new RecordEntry({
        method: brainwaves.label,
        datetime: brainwaves.info.startTime,
        label: req.body.label || null,
        data: brainwaves.info.channelNames.reduce(
          (carry, channelName) => {
            carry[channelName] = brainwaves.data[
              brainwaves.info.channelNames.indexOf(channelName)
            ]
            return carry
          },
          {}
        )
      })
      entry.save()
    })

  setTimeout(() => {
    subscription.unsubscribe()
    res.send({
      samples
    })
  }, 1000 * req.body.seconds)
})

module.exports = router
