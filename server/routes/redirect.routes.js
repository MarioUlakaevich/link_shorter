const {Router} = require('express')
const Link = require('../models/Link')
const redis = require('redis')
const router = Router()

let client;

(async () => {
  client = redis.createClient({
    socket: {
      port: 6379,
      host: 'redis-service'
   }
  })
  client.on("error", (error) => console.error(`Error : ${error}`))
  client.on("connect", () => console.log("Redis finally connected"))
  await client.connect()
})()

module.exports = client

router.get('/:code', async (req, res) => {
  try {
    const code = req.params.code
    console.log('Code: '+code)
    const from = await client.get(code)
    console.log('Link from cache: '+from)
    if (from) {
      return res.redirect(from)
    }

    const link = await Link.findOne({code})
    
    console.log('Link from Mongo: '+link.from)
    if(!link){
      return res.status(404).json({message: "Ссылка не найдена"})
    }

    await client.set(code, link.from)
    res.redirect(link.from)
    
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router