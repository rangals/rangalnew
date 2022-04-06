// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load()
//   }
  
  const express = require('express')
  const cors = require("cors");
  const expressLayouts = require('express-ejs-layouts')

   
//   const bodyParser = require('body-parser')
//   const methodOverride = require('method-override')
  
  const indexRouter = require('./app/routes/index.js')
  const aboutRouter = require('./app/routes/about.js')
  const loginRouter = require('./app/routes/login.js')
//   const bookRouter = require('./routes/books')
  
  var corsOptions = {
    origin: "http://localhost:8081"
  };
  const app = express()
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
  app.use(express.static('public'))
//   app.use(methodOverride('_method'))
//   app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
  
//   const mongoose = require('mongoose')
//   mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//   const db = mongoose.connection
//   db.on('error', error => console.error(error))
//   db.once('open', () => console.log('Connected to Mongoose'))
  
  app.use('/', indexRouter)
  app.use('/about', aboutRouter)
  app.use('/login', loginRouter)
//   app.use('/books', bookRouter)
  
  app.listen(process.env.PORT || 3000)