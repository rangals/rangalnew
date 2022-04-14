// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load()
//   }
  
  const express = require('express')
  const cors = require("cors");
  const expressLayouts = require('express-ejs-layouts')
  const app = express();
   
//   const bodyParser = require('body-parser')
//   const methodOverride = require('method-override')
  
  
  var corsOptions = {
    origin: "http://localhost:8081"
  };
  
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
  
  // app.use('/', indexRouter)
  // app.use('/about', aboutRouter)
  
//   app.use('/books', bookRouter)
  
// const loginRouter = require('./app/routes/login.routes')
// app.use('/login', loginRouter)

require('./app/routes/index.routes')(app)
require('./app/routes/about.routes')(app)
require('./app/routes/login.routes')(app)

// require('./app/routes/auth.routes')(app)
//   const bookRouter = require('./routes/books')

  app.listen(process.env.PORT || 3000)
  console.log('Server started at '+ (process.env.PORT || 3000));