const express = require('express')
const router = express.Router()
// const Book = require('../models/book')

router.get('/', async (req, res) => {

    res.status(200).render('login');
//   let books
//   try {
//     books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
//   } catch {
//     books = []
//   }
//   res.render('index', { books: books })
})


router.get('/register', async (req, res) => {

    res.status(200).render('register');
})

module.exports = router