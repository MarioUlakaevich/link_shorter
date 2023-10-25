const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const cron = require('node-cron')
const Link = require('./models/Link')
const client = require('./routes/redirect.routes')

const app = express()

app.use(express.json({ extended: true }))
app.use(cors())
app.use('/api/link', require('./routes/link.routes'))
app.use('/', require('./routes/redirect.routes'))

cron.schedule('0 0 * * *', async () => {
  try {
      await client.flushall()
      await Link.deleteMany({})
      console.log('База данных успешно очищена')
  } catch (err) {
      console.error('Произошла ошибка при очистке базы данных:', err)
  }
})

const PORT = process.env.PORT || 4000

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {})
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()