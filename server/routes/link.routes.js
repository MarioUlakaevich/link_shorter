const {Router} = require('express')
require('dotenv').config()
const shortid = require('shortid')
const Link = require('../models/Link')
const router = Router()

router.post('/generate', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL
    const {from} = req.body
    const {userId} = req.body
    let {code} = req.body
    
    if(code === ""){
      code = shortid.generate()
    }

    const existing = await Link.findOne({ code, userId })

    if (existing) {
      return res.json({ message: "Ссылка уже существует", link: existing })
    }

    const to = baseUrl + '/' + code

    const link = new Link({
      from, to, code, userId
    })

    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Неизвестная ошибка" })
  }
})

router.get('/links/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const links = await Link.find({userId})
    res.json(links)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router